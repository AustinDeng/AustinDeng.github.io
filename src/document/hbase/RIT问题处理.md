# RIT 问题处理

## 集群一致性

HBase 集群一致性主要包括两个方面：
- HBase Region 一致性：集群中所有Region 都被 assign，而且 deploy 到唯一一台 RegionServer 上，并且该 Region 的状态、在内存中、hbase:meta 表中以及 ZooKeeper 这三个地方需要保持一致
- HBase 表完整性：对于集群中任意一张表，每个 rowkey 都仅能存在于一个 Region 区间

## 使用 HBCK 工具检查一致性

```
# 检查集群一致性和完整性
$ hbase hbck

# 建议重定向到一个日志文件，方便后续修复处理
$ hbase hbck > hbck.log

# 查看更多详细信息
$ hbase hbck -details > hbck.log

# 指定特定的表检测
$ hbase hbck TableFoo TableBar > hbck.log
```

输出的最后一行会有 OK 或者 INCONSISTENCIES 两种情况，如果是 INCONSISTENCIES 则需要进一步修复处理

## HBCK 使用案例

HBCK 工具有两个版本 HBCK1 和 HBCK2， HBCK1 针对 HBase1.x，HBCK2 针对 HBase2.x，不能混用
以下案例是使用 HBCK1 版本

如果执行一次 hbck 修复命令后没有修复，可以再执行一次看看

### Region不在线

当存在 Region 不在线的场景时，可以使用`fixAssignments`参数修复

关键报错信息：
```
ERROR: Region { meta => null, hdfs => hdfs://bdphbase/hbase/data/default/xxxxxxxx/xxxxxxxxxxxxx, deployed => , replicaId => 0 } on HDFS, but not listed in hbase:meta or deployed on any region server
```

执行以下命令修复：
```
hbase hbck -fixAssignments
```

### Meta 表数据异常

当存在 Meta 表数据异常场景时，可以使用`-fixMeta`参数修复

关键报错信息：
```
ERROR: Region { meta => XXXXXXXXXXX,4150,1634403123676.xxxxxxxxxxxxxxxxxxx., hdfs => null, deployed => , replicaId => 0 } found in META, but not in HDFS or deployed on any region server.
```

执行以下命令修复：
```
# -fixMeta 参数一般会结合 -fixAssignments 一起使用
hbase hbck -fixMeta -fixAssignments tableName
```

### Region 不连续，存在空洞

Region 存在空洞可以使用参数`fixHdfsHoles`修复

关键报错信息：
```
ERROR: There is a hole in the region chain between 5980 and 6000. You need to create a new .regioninfo and region dir in hdfs to plug the hole.
```

执行修复前，先查看是否有 region 不在线，如果有则先使用 `-fixAssignments`修复

### regioninfo 表丢失

集群丢块、人为删除等原因都可能导致 regioninfo 表丢失，使用`-fixHdfsOrphans`参数修复

关键报错信息：
```
ERROR: Orphan region in HDFS: Unable to load .regioninfo from table XXXXXX in hdfs dir hdfs://bdphbase/hbase/data/default/ XXXXXX /xxxxxxxxxxxxxxx! It may be an invalid format or version file.Treating as an orphaned regiondir.
```

### tableinfo 表丢失

集群丢块、人为删除等原因都可能导致 tableinfo 表丢失，使用`-fixTableOrphans`参数修复

可能会修复失败，一种解决方法就是：在相同版本的集群中新建一个同名表，复制 tableinfo 表进行修复

关键信息报错：
```
TableInfoMissingException: No table descriptor file under hdfs://bdphbase/hbase/data/default/XXXXXXX
```

### region 出现互相重叠

region 出现有重叠的场景，可以使用`fixhdfsOverlaps`参数修复

关键报错信息：
```
ERROR: (region XXXXXX,994,1599460846542.xxxxxxxxxx.) Multiple regions have the same startkey: 994
ERROR: (region XXXXXX,994,1599543035805.xxxxxxxxxx.) Multiple regions have the same startkey: 994
ERROR: (regions XXXXXX,994,1599543035805.xxxxxxxxxx. and XXXXXX,998,1571500798247.xxxxxxxxxx.) There is an overlap in the region chain.
```

因为这个修复会把重叠的 region 下线，合并为 1 个 region，因此可能会对业务产生抖动

而且该参数有个 bug 可能需要注意一下
Fix Version/s:1.4.10, 1.3.5
Ignoring 'empty' end_key while calculating end_key for new region in HBCK -fixHdfsOverlaps command can cause data loss (HBASE-21920)

### 修复残余的 reference 文件

通过`fixReferenceFiles`参数修复残余的 reference 文件

关键报错信息：
```
ERROR: Found lingering reference file hdfs://bdphbs13/hbase4/data/default/XXXXXX/xxxxxxxxxx/F/3f7f9c436845499eaea025965d6528e3.75b81cdf8bd8e218f5
```

### 其他参数补充说明

- sidelineBigOverlaps -maxOverlapsToSideline <\N>

使用场景：
sidelineBigOverlaps：修复overlap问题过程中，允许跟其他region重叠次数最多的一些region不参与，修复后，可以把没有参与的数据通过 bulkload 加载到相应的region
maxOverlapsToSideline：修复overlap问题过程中，一组里最多允许多少个region不参与

使用命令：
```
hbase hbck -repair -sidelineBigOverlaps -maxOverlapsToSideline 10 tableName
```

- repair

该命令是多个命令的集合，包含：
fixAssignments -fixMeta -fixHdfsHoles -fixHdfsOrphans -fixHdfsOverlaps -fixVersionFile -sidelineBigOverlaps -fixReferenceFiles -fixTableLocks –fixOrphanedTableZnodes

一般overlap问题，可以简单粗暴的直接repair,但是 repair 命令风险比较大，最好不要直接使用，特别是对 fixhdfsoverlaps 问题处理
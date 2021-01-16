# Migration `20210110052613-init`

This migration has been generated by Nicolás Flores Montenegro at 1/10/2021, 2:26:13 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210110052613-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,52 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Comment {
+  id         String      @id @default(uuid())
+  post       Post?       @relation(fields: [postId], references: [id])
+  postId     String?
+  comment    String?
+  createdAt  DateTime    @default(now())
+  updatedAt  DateTime?   @default(now())
+  deletedAt  DateTime?
+}
+
+model Post {
+  id         String      @id @default(uuid())
+  title      String?
+  content    String?
+  user       User        @relation(fields: [userId], references: [id])
+  userId     String
+  createdAt  DateTime    @default(now())
+  updatedAt  DateTime?   @default(now())
+  deletedAt  DateTime?
+  comments   Comment[]
+}
+
+model SequelizeMeta {
+  name String @id
+}
+
+model User {
+  id         String      @id @default(uuid())
+  name       String?
+  lastname   String?
+  email      String      @unique
+  password   String
+  createdAt  DateTime    @default(now())
+  updatedAt  DateTime?   @default(now())
+  deletedAt  DateTime ?
+  isActive   Status      @default(ACTIVE)
+  posts      Post[]
+}
+
+enum Status {
+  ACTIVE
+  DISABLED
+}
```


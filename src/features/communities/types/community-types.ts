
import { community } from "@/src/db/schema";
//import { InferInsertModel, InferSelectModel } from "drizzle-orm";
// Tipos para insertar registro en la tabla communities
//type InsertCommunity = InferInsertModel<typeof community>
export type InsertCommunity = typeof community.$inferInsert  //Otra forma de generar el tipo desde el esquema de drizzle ORM

// Tipo para seleccionar registro en la tabla communities
//type SelectCommunity = InferSelectModel<typeof community>
export type SelectCommunity = typeof community.$inferSelect  //Otra forma de generar el tipo desde el esquema de drizzle ORM     

import { Connection, connect } from "mongoose";

const connection: Connection | null = null;

export const getConnection = async (): Promise<Connection | null> => {
  if (connection) {
    console.log("using cached connection");
    return connection;
  }

  try {
    console.log("establishing new connection");
    const connection = await connect(process.env.MONGO_DB_URL!);
    return connection.connection;
  } catch (err: any) {
    console.log("failed to establish connection", err.message);
    return null;
  }
};

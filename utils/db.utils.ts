import { Connection, connect } from "mongoose";

let connection: Connection | null = null;

export const getConnection = async (): Promise<Connection | null> => {
  if (connection) {
    console.log("using cached connection");
    return connection;
  }

  try {
    console.log("establishing new connection");
    const conn = await connect(process.env.MONGO_DB_URL!);
    conn.connection.useDb("scalingEth");
    connection = conn.connection;

    return conn.connection;
  } catch (err: any) {
    console.log("failed to establish connection", err.message);
    return null;
  }
};

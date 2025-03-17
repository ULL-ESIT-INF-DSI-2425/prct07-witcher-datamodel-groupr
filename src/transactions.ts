/**
 * Interface representing a transaction record.
 */
export interface Transactions {
  /** Unique identifier for the transaction. */
  id: number;
  /** Date of the transaction in string format. */
  date: string;
  /** Identifier of the client involved in the transaction. */
  clientID: number;
  /** Name of the product involved in the transaction. */
  productName: string;
  /** Indicates whether the transaction is a purchase (true) or sale (false). */
  buying: boolean;
  /** Unique identifier of the product involved in the transaction. */
  productID: number;
  /** Optional field representing crowns involved in the transaction. */
  involver_crowns?: number;
}
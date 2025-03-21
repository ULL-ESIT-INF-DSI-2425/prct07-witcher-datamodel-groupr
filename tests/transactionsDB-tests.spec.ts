import { describe, it, expect } from 'vitest';
import { TransactionsDB } from '../src/transactionsDB';
import { Transactions } from '../src/transactions';

describe('Transactions database tests', () => {
  const db = new TransactionsDB();
  const entry: Transactions = { id: 9999, date: 'TestDate', clientID: 9999, productName: 'TestProduct', buying: true, productID: 1, involver_crowns: 1 }
  const entry2: Transactions = { id: 9998, date: 'TestDate2', clientID: 9999, productName: 'TestProduct2', buying: false, productID: 2, involver_crowns: 1 }

  it('should add an entry to the database', () => {
    db.addEntry(entry);
    db.addEntry(entry2);
    const entries = db.getAllEntries();
    expect(entries).toContain(entry);
    expect(entries).toContain(entry2);
  });

  it('shouldnt add an entry that exists in the database', () => {
    expect(() => db.addEntry(entry)).toThrowError('Value not inserted. Value already in table.');
  });

  it('should find an entry in the database', () => {
    expect(db.filterEntry(entry)).not.toBeUndefined();
    expect(db.filterEntry(entry)).toEqual(entry);
    expect(db.filterEntry(entry2)).not.toBeUndefined();
    expect(db.filterEntry(entry2)).toEqual(entry2);
  });

  it('should find by filter an entry from the database', () => {
    expect(db.findValues({ id: 9999 })).toEqual([entry]);
    expect(db.findValues({ date: 'TestDate' })).toEqual([entry]);
    expect(db.findValues({ clientID: 9999 })).toContain(entry);
    expect(db.findValues({ clientID: 9999 })).toContain(entry2);
    expect(db.findValues({ involver_crowns: 1 })).toContain(entry);
    expect(db.findValues({ involver_crowns: 1 })).toContain(entry2);
    expect(db.findValues({ productName: 'TestProduct2' })).toEqual([entry2]);
    expect(db.findValues({ productID: 2 })).toEqual([entry2]);
    expect(db.findValues({ buying: false })).toEqual([entry2]);
  });

  it('should modify an entry from the database', () => {
    db.modifyEntry(9999, { date: 'ModifiedDate', clientID: 9998, productName: 'ModifiedProduct', buying: false, productID: 2, involver_crowns: 2 });
    db.modifyEntry(9998, { date: 'ModifiedDate2' });
    expect(db.findValues({id: 9999})).not.toBeUndefined();
    expect(db.findValues({id: 9999})[0].date).toBe('ModifiedDate');
    expect(db.findValues({id: 9999})[0].clientID).toBe(9998);
    expect(db.findValues({id: 9999})[0].productName).toBe('ModifiedProduct');
    expect(db.findValues({id: 9999})[0].buying).toBe(false);
    expect(db.findValues({id: 9999})[0].productID).toBe(2);
    expect(db.findValues({id: 9999})[0].involver_crowns).toBe(2);
    expect(db.findValues({id: 9998})).not.toBeUndefined();
    expect(db.findValues({id: 9998})[0].date).toBe('ModifiedDate2');
  });

  it('should delete an entry from the database', () => {
    db.deleteEntry({ id: 9999 });
    expect(db.findValues({ id: 9999 })).toEqual([]);
    expect(db.findValues({ id: 9998 })).not.toBe([]);
    db.deleteEntry({ id: 9998 });
    expect(db.findValues({ id: 9998 })).toEqual([]);
  });
});
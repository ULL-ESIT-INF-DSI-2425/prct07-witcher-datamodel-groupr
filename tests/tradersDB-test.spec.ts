import { describe, it, expect } from 'vitest';
import { TradersDB } from '../src/tradersDB';
import { TraderTypes } from '../src/traders';

describe('Traders database tests', () => {
  const db = new TradersDB();
  const entry = { id: 9999, name: 'TestClient', type: TraderTypes.Alchemist, location: 'TestLocation' }
  const entry2 = { id: 9998, name: 'TestClient2', type: TraderTypes.Alchemist, location: 'TestLocation2' }

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
    expect(db.findValues({ name: 'TestClient' })).toEqual([entry]);
    expect(db.findValues({ type: TraderTypes.Alchemist })).toContain(entry);
    expect(db.findValues({ type: TraderTypes.Alchemist })).toContain(entry2);
    expect(db.findValues({ location: 'TestLocation2' })).toEqual([entry2]);
  });

  it('should modify an entry from the database', () => {
    db.modifyEntry(9999, { name: 'ModifiedName', type: TraderTypes.Herbalist, location: 'ModifiedLocation'});
    db.modifyEntry(9998, { location: 'ModifiedLocation' });
    expect(db.findValues({id: 9999})).not.toBeUndefined();
    expect(db.findValues({id: 9999})[0].name).toBe('ModifiedName');
    expect(db.findValues({id: 9999})[0].type).toBe(TraderTypes.Herbalist);
    expect(db.findValues({id: 9999})[0].location).toBe('ModifiedLocation');
    expect(db.findValues({id: 9998})).not.toBeUndefined();
    expect(db.findValues({id: 9998})[0].location).toBe('ModifiedLocation');
  });

  it('should delete an entry from the database', () => {
    db.deleteEntry({ id: 9999 });
    expect(db.findValues({ id: 9999 })).toEqual([]);
    expect(db.findValues({ id: 9998 })).not.toBe([]);
    db.deleteEntry({ id: 9998 });
    expect(db.findValues({ id: 9998 })).toEqual([]);
  });
});
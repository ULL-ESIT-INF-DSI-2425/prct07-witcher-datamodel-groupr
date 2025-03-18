import { describe, it, expect } from 'vitest';
import { AssetsDB } from '../src/AssetsDB';
import { AssetType } from '../src/assets';

describe('Assets database tests', () => {
  const db = new AssetsDB();
  const entry = { id: 9999, name: 'TestAsset', description: 'TestDescription', material: 'TestMaterial', weigth: 1, crown_value: 1, type: AssetType.PRODUCT }
  const entry2 = { id: 9998, name: 'TestAsset2', description: 'TestDescription', material: 'TestMaterial2', weigth: 13, crown_value: 2, type: AssetType.PRODUCT }

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
    expect(db.findValues({ name: 'TestAsset' })).toEqual([entry]);
    expect(db.findValues({ description: 'TestDescription' })).toContain(entry);
    expect(db.findValues({ description: 'TestDescription' })).toContain(entry2);
    expect(db.findValues({ material: 'TestMaterial2' })).toEqual([entry2]);
    expect(db.findValues({ weigth: 13 })).toEqual([entry2]);
    expect(db.findValues({ crown_value: 2 })).toEqual([entry2]);
    expect(db.findValues({ type: AssetType.PRODUCT })).toContain(entry);
    expect(db.findValues({ type: AssetType.PRODUCT })).toContain(entry2);
  });

  it('should modify an entry from the database', () => {
    db.modifyEntry(9999, { name: 'ModifiedAsset', description: 'ModifiedDescription', material: 'ModifiedMaterial', weigth: 2, crown_value: 2 });
    db.modifyEntry(9998, { type: AssetType.ARMOR });
    expect(db.findValues({id: 9999})).not.toBeUndefined();
    expect(db.findValues({id: 9999})[0].name).toBe('ModifiedAsset');
    expect(db.findValues({id: 9999})[0].description).toBe('ModifiedDescription');
    expect(db.findValues({id: 9999})[0].material).toBe('ModifiedMaterial');
    expect(db.findValues({id: 9999})[0].weigth).toBe(2);
    expect(db.findValues({id: 9999})[0].crown_value).toBe(2);
    expect(db.findValues({id: 9998})).not.toBeUndefined();
    expect(db.findValues({id: 9998})[0].type).toBe(AssetType.ARMOR);
  });

  it('should delete an entry from the database', () => {
    db.deleteEntry({ id: 9999 });
    expect(db.findValues({ id: 9999 })).toEqual([]);
    expect(db.findValues({ id: 9998 })).not.toBe([]);
    db.deleteEntry({ id: 9998 });
    expect(db.findValues({ id: 9998 })).toEqual([]);
  });
});
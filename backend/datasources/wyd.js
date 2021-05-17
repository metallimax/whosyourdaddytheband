const fs = require('fs');
// const { DataSource } = require('apollo-server');
const { DataSource, DataSourceConfig } = require('apollo-datasource');

let data = {};
const dataFilename = './data/data.json';
try {
  console.log(`Loading data from ${dataFilename} ...`)
  const rawData = fs.readFileSync(dataFilename);
  const jsonData = JSON.parse(rawData);
  data = { ...jsonData };
  console.log('Data loaded.')
}
catch (e) {
  console.error("Unable to load data.");
  console.error(e);
}

COL_MEMBER = 'wyd.member';
COL_ROLE = 'wyd.role';
COL_GEAR = 'wyd.gear';
COL_GEAR_TYPE = 'wyd.geartype';
COL_RECORD = 'wyd.record';
COL_RECORD_TRACK = 'wyd.recordtrack';
COL_SONG = 'wyd.song';
COL_CONCERT = 'wyd.concert';

const _getFields = (item) => {
  return {
    id: item.pk,
    ...item.fields,
  };
};

const _lookup = (collection, id) => {
  const items = data.collections[collection];

  for (let i = 0; i < items.length; i++) {
    // Use == because you can compare string to int
    if (items[i].pk == id) {
      return _getFields(items[i]);
    }
  }

  return null;
};

const _getItems = (collection, filter) => {
  return data.collections[collection]
    .filter((item) => {
      if (filter === undefined) {
        return true;
      }

      if (typeof(filter)) {
        return (Object.keys(filter).every((key) => {
          return item.fields[key] === filter[key];
        }));
      }

      return item.id == filter;
    });
}

const _getMappedItems = (collection, filter) => {
  return _getItems(collection, filter).map(_getFields);
}

class Wyd extends DataSource {

  getMember(id) {
    return _lookup(COL_MEMBER, id);
  }

  getMembers() {
    return _getMappedItems(COL_MEMBER);
  }

  getRole(id) {
    return _lookup(COL_ROLE, id);
  }

  getGearType(id) {
    return _lookup(COL_GEAR_TYPE, id);
  }

  getGearsByMemberId(memberId) {
    return _getMappedItems(COL_GEAR, {
      member: memberId,
      active: true,
    });
  }

  getRecord(id) {
    return _lookup(COL_RECORD, id);
  }

  getRecords() {
    return _getMappedItems(COL_RECORD);
  }

  getConcert(id) {
    return _lookup(COL_CONCERT, id);
  }

  getConcerts() {
    return _getMappedItems(COL_CONCERT);
  }

  getSong(id) {
    return _lookup(COL_SONG, id);
  }

  getSongsByRecord(recordId) {
    return _getMappedItems(COL_RECORD_TRACK, {record: recordId})
      .sort((a, b) => a.rank > b.rank ? 1 : -1)
      .map((track) => {
        return {
          ...this.getSong(track.song),
          rank: track.rank,
        };
      });
  }
}

module.exports.Wyd = Wyd;

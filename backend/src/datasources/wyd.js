const fs = require('fs');
const path = require('path');
const { DataSource, DataSourceConfig } = require('apollo-datasource');

let data = {};
const dataFilename = path.join(__dirname, '../data/data.json');
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

const COL_MEMBER = 'wyd.member';
const COL_ROLE = 'wyd.role';
const COL_GEAR = 'wyd.gear';
const COL_GEAR_TYPE = 'wyd.geartype';
const COL_RECORD = 'wyd.record';
const COL_RECORD_TRACK = 'wyd.recordtrack';
const COL_SONG = 'wyd.song';
const COL_CONCERT = 'wyd.concert';
const COL_CONCERT_SETLIST = 'wyd.concertsetlist';

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

  getGearsByMember(memberId) {
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

  getRecordsBySong(songId) {
    return _getMappedItems(COL_RECORD_TRACK, {song: songId})
      .map((track) => {
        return this.getRecord(track.record);
      });
  }

  getRecordsByMember(memberId) {
    return _getMappedItems(COL_RECORD)
      .filter((record) => record.members.indexOf(memberId) > -1);
  }

  getConcert(id) {
    return _lookup(COL_CONCERT, id);
  }

  getConcerts() {
    return _getMappedItems(COL_CONCERT);
  }

  getConcertsBySong(songId) {
    return _getMappedItems(COL_CONCERT_SETLIST, {song: songId})
      .map((entry) => {
        return this.getConcert(entry.concert);
      });
  }

  getConcertsByMember(memberId) {
    return _getMappedItems(COL_CONCERT)
      .filter((concert) => concert.members.indexOf(memberId) > -1);
  }

  getSong(id) {
    return _lookup(COL_SONG, id);
  }

  getSongs() {
    return _getMappedItems(COL_SONG);
  }

  getSongsByRecord(recordId) {
    return _getMappedItems(COL_RECORD_TRACK, {record: recordId})
      .map((track) => {
        return {
          ...this.getSong(track.song),
          rank: track.rank,
        };
      });
  }

  getSongsByConcert(concertId) {
    return _getMappedItems(COL_CONCERT_SETLIST, {concert: concertId})
      .map((track) => {
        return {
          ...this.getSong(track.song),
          rank: track.rank,
        };
      });
  }
}

module.exports.Wyd = Wyd;

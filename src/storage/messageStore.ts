import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'safenest.db', location: 'default' });

export class MessageStore {
  static async initialize() {
    return new Promise<void>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, conversationId TEXT, text TEXT, senderId TEXT, timestamp INTEGER)',
          [], () => resolve(), (_, err) => { reject(err); return false; }
        );
      });
    });
  }

  static async saveMessage(msg: { id: string; conversationId: string; text: string; senderId: string; timestamp: number }) {
    return new Promise<void>((resolve) => {
      db.transaction(tx => {
        tx.executeSql('INSERT OR REPLACE INTO messages VALUES (?,?,?,?,?)',
          [msg.id, msg.conversationId, msg.text, msg.senderId, msg.timestamp],
          () => resolve()
        );
      });
    });
  }

  static async getMessages(conversationId: string, limit = 50) {
    return new Promise<any[]>((resolve) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM messages WHERE conversationId = ? ORDER BY timestamp DESC LIMIT ?',
          [conversationId, limit],
          (_, result) => resolve(result.rows.raw())
        );
      });
    });
  }
}

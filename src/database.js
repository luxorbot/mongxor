const { MongoClient } = require('mongodb');

class mongxor {
    constructor(url, database) {
        this.url = url;
        this.database = database;
    }

    async connect() {
        this.client = await MongoClient.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = this.client.db(this.database);
    }

    async close() {
        if (this.client) {
            await this.client.close();
        }
    }

    async set(key, value) {
        try {
            await this.connect();
            await this.db.collection("data").updateOne({ key: key }, { $set: { value: value } }, { upsert: true });
        } catch (error) {
            throw new Error('Veri eklenirken bir hata oluştu.');
        } finally {
            await this.close();
        }
    }

    async get(key) {
        try {
            await this.connect();
            const result = await this.db.collection("data").findOne({ key: key });
            return result;
        } catch (error) {
            throw new Error('Veri alınırken bir hata oluştu.');
        } finally {
            await this.close();
        }
    }

    async fetch(key) {
        const result = await this.get(key);
        return result ? result.value : null;
    }

    async remove(key) {
        try {
            await this.connect();
            const result = await this.db.collection("data").deleteOne({ key: key });
            return result.deletedCount > 0;
        } catch (error) {
            throw new Error('Veri silinirken bir hata oluştu.');
        } finally {
            await this.close();
        }
    }

    async delete() {
        try {
            await this.connect();
            const result = await this.db.collection("data").deleteMany({});
            return result.deletedCount;
        } catch (error) {
            throw new Error('Veri silinirken bir hata oluştu.');
        } finally {
            await this.close();
        }
    }

    async update(key, value) {
        try {
            await this.connect();
            const result = await this.db.collection("data").updateOne({ key: key }, { $set: { value: value } });
            return result.modifiedCount > 0;
        } catch (error) {
            throw new Error('Veri güncellenirken bir hata oluştu.');
        } finally {
            await this.close();
        }
    }

    async add(key, values) {
        if (typeof values !== 'object' || Object.keys(values).length === 0) {
            throw new Error('Geçersiz değer nesnesi.');
        }

        await this.connect();
        const updateObject = {};
        for (const field in values) {
            if (values.hasOwnProperty(field)) {
                const fieldValue = parseFloat(values[field]);
                if (!isNaN(fieldValue)) {
                    updateObject[field] = fieldValue;
                }
            }
        }

        if (Object.keys(updateObject).length > 0) {
            try {
                const result = await this.db.collection("data").updateOne({ key: key }, { $inc: updateObject }, { upsert: true });
                return result.modifiedCount > 0;
            } catch (error) {
                throw new Error('Veri eklenirken bir hata oluştu.');
            } finally {
                await this.close();
            }
        } else {
            throw new Error('Nesnede geçersiz değerler var.');
        }
    }

    async subtract(key, values) {
        for (const field in values) {
            if (values.hasOwnProperty(field)) {
                values[field] = -values[field];
            }
        }
        return this.add(key, values);
    }
}

module.exports = mongxor;
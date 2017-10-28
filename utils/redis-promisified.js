"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bb = require("bluebird");
const _ = require("lodash");
function Command(command, args, call_on_write) {
    this.command = command;
    this.args = args;
    this.buffer_args = false;
    this.call_on_write = call_on_write;
}
class ConnRedis {
    constructor(client) {
        this.redisClient = client;
        this.promisifyFuncs();
    }
    promisifyFuncs() {
        this.auth = bb.promisify(this.redisClient.auth, { context: this.redisClient });
        this.append = bb.promisify(this.redisClient.append, { context: this.redisClient });
        this.bitcount = bb.promisify(this.redisClient.bitcount, { context: this.redisClient });
        this.set = bb.promisify(this.redisClient.set, { context: this.redisClient });
        this.get = bb.promisify(this.redisClient.get, { context: this.redisClient });
        this.exists = bb.promisify(this.redisClient.exists, { context: this.redisClient });
        this.get = bb.promisify(this.redisClient.get, { context: this.redisClient });
        this.set = bb.promisify(this.redisClient.set, { context: this.redisClient });
        this.setnx = bb.promisify(this.redisClient.setnx, { context: this.redisClient });
        this.setex = bb.promisify(this.redisClient.setex, { context: this.redisClient });
        this.append = bb.promisify(this.redisClient.append, { context: this.redisClient });
        this.strlen = bb.promisify(this.redisClient.strlen, { context: this.redisClient });
        this.del = bb.promisify(this.redisClient.del, { context: this.redisClient });
        this.exists = bb.promisify(this.redisClient.exists, { context: this.redisClient });
        this.setbit = bb.promisify(this.redisClient.setbit, { context: this.redisClient });
        this.getbit = bb.promisify(this.redisClient.getbit, { context: this.redisClient });
        this.setrange = bb.promisify(this.redisClient.setrange, { context: this.redisClient });
        this.getrange = bb.promisify(this.redisClient.getrange, { context: this.redisClient });
        this.substr = bb.promisify(this.redisClient.substr, { context: this.redisClient });
        this.incr = bb.promisify(this.redisClient.incr, { context: this.redisClient });
        this.decr = bb.promisify(this.redisClient.decr, { context: this.redisClient });
        this.mget = bb.promisify(this.redisClient.mget, { context: this.redisClient });
        this.lpush = bb.promisify(this.redisClient.lpush, { context: this.redisClient });
        this.rpushx = bb.promisify(this.redisClient.rpushx, { context: this.redisClient });
        this.lpushx = bb.promisify(this.redisClient.lpushx, { context: this.redisClient });
        this.linsert = bb.promisify(this.redisClient.linsert, { context: this.redisClient });
        this.rpop = bb.promisify(this.redisClient.rpop, { context: this.redisClient });
        this.lpop = bb.promisify(this.redisClient.lpop, { context: this.redisClient });
        this.brpop = bb.promisify(this.redisClient.brpop, { context: this.redisClient });
        this.brpoplpush = bb.promisify(this.redisClient.brpoplpush, { context: this.redisClient });
        this.blpop = bb.promisify(this.redisClient.blpop, { context: this.redisClient });
        this.llen = bb.promisify(this.redisClient.llen, { context: this.redisClient });
        this.lindex = bb.promisify(this.redisClient.lindex, { context: this.redisClient });
        this.lset = bb.promisify(this.redisClient.lset, { context: this.redisClient });
        this.lrange = bb.promisify(this.redisClient.lrange, { context: this.redisClient });
        this.ltrim = bb.promisify(this.redisClient.ltrim, { context: this.redisClient });
        this.lrem = bb.promisify(this.redisClient.lrem, { context: this.redisClient });
        this.rpoplpush = bb.promisify(this.redisClient.rpoplpush, { context: this.redisClient });
        this.sadd = bb.promisify(this.redisClient.sadd, { context: this.redisClient });
        this.srem = bb.promisify(this.redisClient.srem, { context: this.redisClient });
        this.smove = bb.promisify(this.redisClient.smove, { context: this.redisClient });
        this.sismember = bb.promisify(this.redisClient.sismember, { context: this.redisClient });
        this.scard = bb.promisify(this.redisClient.scard, { context: this.redisClient });
        this.spop = bb.promisify(this.redisClient.spop, { context: this.redisClient });
        this.srandmember = bb.promisify(this.redisClient.srandmember, { context: this.redisClient });
        this.sinter = bb.promisify(this.redisClient.sinter, { context: this.redisClient });
        this.sinterstore = bb.promisify(this.redisClient.sinterstore, { context: this.redisClient });
        this.sunion = bb.promisify(this.redisClient.sunion, { context: this.redisClient });
        this.sunionstore = bb.promisify(this.redisClient.sunionstore, { context: this.redisClient });
        this.sdiff = bb.promisify(this.redisClient.sdiff, { context: this.redisClient });
        this.sdiffstore = bb.promisify(this.redisClient.sdiffstore, { context: this.redisClient });
        this.smembers = bb.promisify(this.redisClient.smembers, { context: this.redisClient });
        this.zadd = bb.promisify(this.redisClient.zadd, { context: this.redisClient });
        this.zincrby = bb.promisify(this.redisClient.zincrby, { context: this.redisClient });
        this.zrem = bb.promisify(this.redisClient.zrem, { context: this.redisClient });
        this.zremrangebyscore = bb.promisify(this.redisClient.zremrangebyscore, { context: this.redisClient });
        this.zremrangebyrank = bb.promisify(this.redisClient.zremrangebyrank, { context: this.redisClient });
        this.zunionstore = bb.promisify(this.redisClient.zunionstore, { context: this.redisClient });
        this.zinterstore = bb.promisify(this.redisClient.zinterstore, { context: this.redisClient });
        this.zrange = bb.promisify(this.redisClient.zrange, { context: this.redisClient });
        this.zrangebyscore = bb.promisify(this.redisClient.zrangebyscore, { context: this.redisClient });
        this.zrevrangebyscore = bb.promisify(this.redisClient.zrevrangebyscore, { context: this.redisClient });
        this.zcount = bb.promisify(this.redisClient.zcount, { context: this.redisClient });
        this.zrevrange = bb.promisify(this.redisClient.zrevrange, { context: this.redisClient });
        this.zcard = bb.promisify(this.redisClient.zcard, { context: this.redisClient });
        this.zscore = bb.promisify(this.redisClient.zscore, { context: this.redisClient });
        this.zrank = bb.promisify(this.redisClient.zrank, { context: this.redisClient });
        this.zrevrank = bb.promisify(this.redisClient.zrevrank, { context: this.redisClient });
        this.hset = bb.promisify(this.redisClient.hset, { context: this.redisClient });
        this.hsetnx = bb.promisify(this.redisClient.hsetnx, { context: this.redisClient });
        this.hget = bb.promisify(this.redisClient.hget, { context: this.redisClient });
        this.hmset = bb.promisify(this.redisClient.hmset, { context: this.redisClient });
        this.hmset = bb.promisify(this.redisClient.hmset, { context: this.redisClient });
        this.hmget = bb.promisify(this.redisClient.hmget, { context: this.redisClient });
        this.hincrby = bb.promisify(this.redisClient.hincrby, { context: this.redisClient });
        this.hdel = bb.promisify(this.redisClient.hdel, { context: this.redisClient });
        this.hlen = bb.promisify(this.redisClient.hlen, { context: this.redisClient });
        this.hkeys = bb.promisify(this.redisClient.hkeys, { context: this.redisClient });
        this.hvals = bb.promisify(this.redisClient.hvals, { context: this.redisClient });
        this.hgetall = bb.promisify(this.redisClient.hgetall, { context: this.redisClient });
        this.hgetall = bb.promisify(this.redisClient.hgetall, { context: this.redisClient });
        this.hexists = bb.promisify(this.redisClient.hexists, { context: this.redisClient });
        this.incrby = bb.promisify(this.redisClient.incrby, { context: this.redisClient });
        this.decrby = bb.promisify(this.redisClient.decrby, { context: this.redisClient });
        this.getset = bb.promisify(this.redisClient.getset, { context: this.redisClient });
        this.mset = bb.promisify(this.redisClient.mset, { context: this.redisClient });
        this.msetnx = bb.promisify(this.redisClient.msetnx, { context: this.redisClient });
        this.randomkey = bb.promisify(this.redisClient.randomkey, { context: this.redisClient });
        this.select = bb.promisify(this.redisClient.select, { context: this.redisClient });
        this.move = bb.promisify(this.redisClient.move, { context: this.redisClient });
        this.rename = bb.promisify(this.redisClient.rename, { context: this.redisClient });
        this.renamenx = bb.promisify(this.redisClient.renamenx, { context: this.redisClient });
        this.expire = bb.promisify(this.redisClient.expire, { context: this.redisClient });
        this.expireat = bb.promisify(this.redisClient.expireat, { context: this.redisClient });
        this.keys = bb.promisify(this.redisClient.keys, { context: this.redisClient });
        this.dbsize = bb.promisify(this.redisClient.dbsize, { context: this.redisClient });
        this.auth = bb.promisify(this.redisClient.auth, { context: this.redisClient });
        this.ping = bb.promisify(this.redisClient.ping, { context: this.redisClient });
        this.echo = bb.promisify(this.redisClient.echo, { context: this.redisClient });
        this.save = bb.promisify(this.redisClient.save, { context: this.redisClient });
        this.bgsave = bb.promisify(this.redisClient.bgsave, { context: this.redisClient });
        this.bgrewriteaof = bb.promisify(this.redisClient.bgrewriteaof, { context: this.redisClient });
        this.shutdown = bb.promisify(this.redisClient.shutdown, { context: this.redisClient });
        this.lastsave = bb.promisify(this.redisClient.lastsave, { context: this.redisClient });
        this.type = bb.promisify(this.redisClient.type, { context: this.redisClient });
        this.exec = bb.promisify(this.redisClient.exec, { context: this.redisClient });
        this.discard = bb.promisify(this.redisClient.discard, { context: this.redisClient });
        this.sync = bb.promisify(this.redisClient.sync, { context: this.redisClient });
        this.flushdb = bb.promisify(this.redisClient.flushdb, { context: this.redisClient });
        this.flushall = bb.promisify(this.redisClient.flushall, { context: this.redisClient });
        this.sort = bb.promisify(this.redisClient.sort, { context: this.redisClient });
        this.info = bb.promisify(this.redisClient.info, { context: this.redisClient });
        this.monitor = bb.promisify(this.redisClient.monitor, { context: this.redisClient });
        this.ttl = bb.promisify(this.redisClient.ttl, { context: this.redisClient });
        this.persist = bb.promisify(this.redisClient.persist, { context: this.redisClient });
        this.slaveof = bb.promisify(this.redisClient.slaveof, { context: this.redisClient });
        this.debug = bb.promisify(this.redisClient.debug, { context: this.redisClient });
        this.config = bb.promisify(this.redisClient.config, { context: this.redisClient });
        this.subscribe = bb.promisify(this.redisClient.subscribe, { context: this.redisClient });
        this.unsubscribe = bb.promisify(this.redisClient.unsubscribe, { context: this.redisClient });
        this.psubscribe = bb.promisify(this.redisClient.psubscribe, { context: this.redisClient });
        this.punsubscribe = bb.promisify(this.redisClient.punsubscribe, { context: this.redisClient });
        this.publish = bb.promisify(this.redisClient.publish, { context: this.redisClient });
        this.watch = bb.promisify(this.redisClient.watch, { context: this.redisClient });
        this.unwatch = bb.promisify(this.redisClient.unwatch, { context: this.redisClient });
        this.cluster = bb.promisify(this.redisClient.cluster, { context: this.redisClient });
        this.restore = bb.promisify(this.redisClient.restore, { context: this.redisClient });
        this.migrate = bb.promisify(this.redisClient.migrate, { context: this.redisClient });
        this.dump = bb.promisify(this.redisClient.dump, { context: this.redisClient });
        this.object = bb.promisify(this.redisClient.object, { context: this.redisClient });
        this.client = bb.promisify(this.redisClient.client, { context: this.redisClient });
        this.eval = bb.promisify(this.redisClient.eval, { context: this.redisClient });
        this.evalsha = bb.promisify(this.redisClient.evalsha, { context: this.redisClient });
        this.script = bb.promisify(this.redisClient.script, { context: this.redisClient });
        this.script = bb.promisify(this.redisClient.script, { context: this.redisClient });
        this.quit = bb.promisify(this.redisClient.quit, { context: this.redisClient });
        this.sscan = bb.promisify(this.redisClient.sscan, { context: this.redisClient });
        this.scan = bb.promisify(this.redisClient.scan, { context: this.redisClient });
        this.hscan = bb.promisify(this.redisClient.hscan, { context: this.redisClient });
        this.zscan = bb.promisify(this.redisClient.zscan, { context: this.redisClient });
    }
    multi(...args) {
        const multi = this.redisClient.multi(args);
        return new ConnRedisMulti(multi);
    }
    // support geo
    geoadd(key, args) {
        const geoArgs = args.map(geo => {
            return [geo.longitude, geo.latitude, geo.member];
        });
        const _args = _.flatten([key, ...geoArgs]);
        return new Promise((resolve, reject) => {
            this.redisClient.send_command('geoadd', _args, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    geohash(key, args) {
        const _args = [key, ...args];
        return new Promise((resolve, reject) => {
            this.redisClient.send_command('geohash', _args, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    geopos(key, args) {
        const _args = [key, ...args];
        return new Promise((resolve, reject) => {
            this.redisClient.send_command('geopos', _args, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    const geos = [];
                    for (let i = 0; i < data.length; i += 2) {
                        geos.push({
                            longitude: data[i],
                            latitude: data[i + 1],
                            member: args[i / 2]
                        });
                    }
                    resolve(geos);
                }
            });
        });
    }
    geodist(key, mem1, mem2, unit) {
        const args = [key, mem1, mem2, unit].filter(k => !!k);
        return new Promise((resolve, reject) => {
            this.redisClient.send_command('geohash', args, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    georadius(key, longitude, latitude, radius, unit, withCoord, withDist, withHash, count, order) {
        const _withCoord = withCoord == true ? 'WITHCOORD' : undefined;
        const _withDist = withDist == true ? 'WITHDIST' : undefined;
        const _withHash = withHash == true ? 'WITHHASH' : undefined;
        const _count = (!!count && count > 0) ? ['COUNT', count] : [];
        const args = [key, longitude, latitude, radius, unit, _withCoord, _withDist, _withHash, ..._count, order].filter(k => !!k);
        return new Promise((resolve, reject) => {
            this.redisClient.send_command('georadius', args, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.createGeoRadiusOutput(data, withCoord, withDist, withHash));
                }
            });
        });
    }
    georadiusbymember(key, member, radius, unit, withCoord, withDist, withHash, count, order) {
        const _withCoord = withCoord == true ? 'WITHCOORD' : undefined;
        const _withDist = withDist == true ? 'WITHDIST' : undefined;
        const _withHash = withHash == true ? 'WITHHASH' : undefined;
        const _count = (!!count && count > 0) ? ['COUNT', count] : [];
        const args = [key, member, radius, unit, _withCoord, _withDist, _withHash, ..._count, order].filter(k => !!k);
        return new Promise((resolve, reject) => {
            this.redisClient.send_command('georadius', args, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.createGeoRadiusOutput(data, withCoord, withDist, withHash));
                }
            });
        });
    }
    createGeoRadiusOutput(data, withCoord, withDist, withHash) {
        let i = 0;
        const idxs = {};
        idxs.memIdx = i++;
        if (withDist) {
            idxs.distIdx = i++;
        }
        if (withHash) {
            idxs.hashIdx = i++;
        }
        if (withCoord) {
            idxs.coordIdx = i++;
        }
        const geos = data.map(d => {
            const geo = {};
            geo.member = d[idxs.memIdx];
            if (withDist) {
                geo.dist = d[idxs.distIdx];
            }
            if (withHash) {
                geo.hash = d[idxs.hashIdx];
            }
            if (withCoord) {
                geo.longitude = d[idxs.coordIdx][0];
                geo.latitude = d[idxs.coordIdx][1];
            }
            return geo;
        });
        return geos;
    }
}
;
class ConnRedisMulti {
    constructor(client) {
        this.redisMulti = client;
    }
    send_command(command, ...args) {
        const queue = this['queue'];
        queue.push(new Command(command, args));
    }
    append(...args) { this.redisMulti.append(args); return this; }
    set(...args) { this.redisMulti.set(args); return this; }
    get(...args) { this.redisMulti.get(args); return this; }
    exists(...args) { this.redisMulti.exists(args); return this; }
    setnx(...args) { this.redisMulti.setnx(args); return this; }
    setex(...args) { this.redisMulti.setex(args); return this; }
    strlen(...args) { this.redisMulti.strlen(args); return this; }
    del(...args) { this.redisMulti.del(args); return this; }
    setbit(...args) { this.redisMulti.setbit(args); return this; }
    getbit(...args) { this.redisMulti.getbit(args); return this; }
    setrange(...args) { this.redisMulti.setrange(args); return this; }
    getrange(...args) { this.redisMulti.getrange(args); return this; }
    substr(...args) { this.redisMulti.substr(args); return this; }
    incr(...args) { this.redisMulti.incr(args); return this; }
    decr(...args) { this.redisMulti.decr(args); return this; }
    mget(...args) { this.redisMulti.mget(args); return this; }
    lpush(...args) { this.redisMulti.lpush(args); return this; }
    rpushx(...args) { this.redisMulti.rpushx(args); return this; }
    lpushx(...args) { this.redisMulti.lpushx(args); return this; }
    linsert(...args) { this.redisMulti.linsert(args); return this; }
    rpop(...args) { this.redisMulti.rpop(args); return this; }
    lpop(...args) { this.redisMulti.lpop(args); return this; }
    brpop(...args) { this.redisMulti.brpop(args); return this; }
    brpoplpush(...args) { this.redisMulti.brpoplpush(args); return this; }
    blpop(...args) { this.redisMulti.blpop(args); return this; }
    llen(...args) { this.redisMulti.llen(args); return this; }
    lindex(...args) { this.redisMulti.lindex(args); return this; }
    lset(...args) { this.redisMulti.lset(args); return this; }
    lrange(...args) { this.redisMulti.lrange(args); return this; }
    ltrim(...args) { this.redisMulti.ltrim(args); return this; }
    lrem(...args) { this.redisMulti.lrem(args); return this; }
    rpoplpush(...args) { this.redisMulti.rpoplpush(args); return this; }
    sadd(...args) { this.redisMulti.sadd(args); return this; }
    srem(...args) { this.redisMulti.srem(args); return this; }
    smove(...args) { this.redisMulti.smove(args); return this; }
    sismember(...args) { this.redisMulti.sismember(args); return this; }
    scard(...args) { this.redisMulti.scard(args); return this; }
    spop(...args) { this.redisMulti.spop(args); return this; }
    srandmember(...args) { this.redisMulti.srandmember(args); return this; }
    sinter(...args) { this.redisMulti.sinter(args); return this; }
    sinterstore(...args) { this.redisMulti.sinterstore(args); return this; }
    sunion(...args) { this.redisMulti.sunion(args); return this; }
    sunionstore(...args) { this.redisMulti.sunionstore(args); return this; }
    sdiff(...args) { this.redisMulti.sdiff(args); return this; }
    sdiffstore(...args) { this.redisMulti.sdiffstore(args); return this; }
    smembers(...args) { this.redisMulti.smembers(args); return this; }
    zadd(...args) { this.redisMulti.zadd(args); return this; }
    zincrby(...args) { this.redisMulti.zincrby(args); return this; }
    zrem(...args) { this.redisMulti.zrem(args); return this; }
    zremrangebyscore(...args) { this.redisMulti.zremrangebyscore(args); return this; }
    zremrangebyrank(...args) { this.redisMulti.zremrangebyrank(args); return this; }
    zunionstore(...args) { this.redisMulti.zunionstore(args); return this; }
    zinterstore(...args) { this.redisMulti.zinterstore(args); return this; }
    zrange(...args) { this.redisMulti.zrange(args); return this; }
    zrangebyscore(...args) { this.redisMulti.zrangebyscore(args); return this; }
    zrevrangebyscore(...args) { this.redisMulti.zrevrangebyscore(args); return this; }
    zcount(...args) { this.redisMulti.zcount(args); return this; }
    zrevrange(...args) { this.redisMulti.zrevrange(args); return this; }
    zcard(...args) { this.redisMulti.zcard(args); return this; }
    zscore(...args) { this.redisMulti.zscore(args); return this; }
    zrank(...args) { this.redisMulti.zrank(args); return this; }
    zrevrank(...args) { this.redisMulti.zrevrank(args); return this; }
    hset(...args) { this.redisMulti.hset(args); return this; }
    hsetnx(...args) { this.redisMulti.hsetnx(args); return this; }
    hget(...args) { this.redisMulti.hget(args); return this; }
    hmset(...args) { this.redisMulti.hmset(args); return this; }
    hmget(...args) { this.redisMulti.hmget(args); return this; }
    hincrby(...args) { this.redisMulti.hincrby(args); return this; }
    hdel(...args) { this.redisMulti.hdel(args); return this; }
    hlen(...args) { this.redisMulti.hlen(args); return this; }
    hkeys(...args) { this.redisMulti.hkeys(args); return this; }
    hvals(...args) { this.redisMulti.hvals(args); return this; }
    hgetall(...args) { this.redisMulti.hgetall(args); return this; }
    hexists(...args) { this.redisMulti.hexists(args); return this; }
    incrby(...args) { this.redisMulti.incrby(args); return this; }
    decrby(...args) { this.redisMulti.decrby(args); return this; }
    getset(...args) { this.redisMulti.getset(args); return this; }
    mset(...args) { this.redisMulti.mset(args); return this; }
    msetnx(...args) { this.redisMulti.msetnx(args); return this; }
    randomkey(...args) { this.redisMulti.randomkey(args); return this; }
    select(...args) { this.redisMulti.select(args); return this; }
    move(...args) { this.redisMulti.move(args); return this; }
    rename(...args) { this.redisMulti.rename(args); return this; }
    renamenx(...args) { this.redisMulti.renamenx(args); return this; }
    expire(...args) { this.redisMulti.expire(args); return this; }
    expireat(...args) { this.redisMulti.expireat(args); return this; }
    keys(...args) { this.redisMulti.keys(args); return this; }
    dbsize(...args) { this.redisMulti.dbsize(args); return this; }
    auth(...args) { this.redisMulti.auth(args); return this; }
    ping(...args) { this.redisMulti.ping(args); return this; }
    echo(...args) { this.redisMulti.echo(args); return this; }
    save(...args) { this.redisMulti.save(args); return this; }
    bgsave(...args) { this.redisMulti.bgsave(args); return this; }
    bgrewriteaof(...args) { this.redisMulti.bgrewriteaof(args); return this; }
    shutdown(...args) { this.redisMulti.shutdown(args); return this; }
    lastsave(...args) { this.redisMulti.lastsave(args); return this; }
    type(...args) { this.redisMulti.type(args); return this; }
    multi(...args) { this.redisMulti.multi(args); return this; }
    discard(...args) { this.redisMulti.discard(args); return this; }
    sync(...args) { this.redisMulti.sync(args); return this; }
    flushdb(...args) { this.redisMulti.flushdb(args); return this; }
    flushall(...args) { this.redisMulti.flushall(args); return this; }
    sort(...args) { this.redisMulti.sort(args); return this; }
    info(...args) { this.redisMulti.info(args); return this; }
    monitor(...args) { this.redisMulti.monitor(args); return this; }
    ttl(...args) { this.redisMulti.ttl(args); return this; }
    persist(...args) { this.redisMulti.persist(args); return this; }
    slaveof(...args) { this.redisMulti.slaveof(args); return this; }
    debug(...args) { this.redisMulti.debug(args); return this; }
    config(...args) { this.redisMulti.config(args); return this; }
    subscribe(...args) { this.redisMulti.subscribe(args); return this; }
    unsubscribe(...args) { this.redisMulti.unsubscribe(args); return this; }
    psubscribe(...args) { this.redisMulti.psubscribe(args); return this; }
    punsubscribe(...args) { this.redisMulti.punsubscribe(args); return this; }
    publish(...args) { this.redisMulti.publish(args); return this; }
    watch(...args) { this.redisMulti.watch(args); return this; }
    unwatch(...args) { this.redisMulti.unwatch(args); return this; }
    cluster(...args) { this.redisMulti.cluster(args); return this; }
    restore(...args) { this.redisMulti.restore(args); return this; }
    migrate(...args) { this.redisMulti.migrate(args); return this; }
    dump(...args) { this.redisMulti.dump(args); return this; }
    object(...args) { this.redisMulti.object(args); return this; }
    client(...args) { this.redisMulti.client(args); return this; }
    eval(...args) { this.redisMulti.eval(args); return this; }
    evalsha(...args) { this.redisMulti.evalsha(args); return this; }
    quit(...args) { this.redisMulti.quit(args); return this; }
    scan(...args) { this.redisMulti.scan(args); return this; }
    hscan(...args) { this.redisMulti.hscan(args); return this; }
    zscan(...args) { this.redisMulti.zscan(args); return this; }
    // support geo
    geoadd(key, args) {
        const geoArgs = args.map(geo => {
            return [geo.longitude, geo.latitude, geo.member];
        });
        const _args = _.flatten([key, ...geoArgs]);
        this.send_command('geoadd', _args);
        return this;
    }
    geohash(key, args) {
        const _args = [key, ...args];
        this.send_command('geohash', _args);
        return this;
    }
    geopos(key, args) {
        const _args = [key, ...args];
        this.send_command('geopos', _args);
        return this;
    }
    geodist(key, mem1, mem2, unit) {
        const _args = [key, mem1, mem2, unit].filter(k => !!k);
        this.send_command('geopos', _args);
        return this;
    }
    georadius(key, longitude, latitude, radius, unit, withCoord, withDist, withHash, count, order) {
        const _withCoord = withCoord == true ? 'WITHCOORD' : undefined;
        const _withDist = withDist == true ? 'WITHDIST' : undefined;
        const _withHash = withHash == true ? 'WITHHASH' : undefined;
        const _count = (!!count && count > 0) ? ['COUNT', count] : [];
        const args = [key, longitude, latitude, radius, unit, _withCoord, _withDist, _withHash, ..._count, order].filter(k => !!k);
        this.send_command('georadius', args);
        return this;
    }
    georadiusbymember(key, member, radius, unit, withCoord, withDist, withHash, count, order) {
        const _withCoord = withCoord == true ? 'WITHCOORD' : undefined;
        const _withDist = withDist == true ? 'WITHDIST' : undefined;
        const _withHash = withHash == true ? 'WITHHASH' : undefined;
        const _count = (!!count && count > 0) ? ['COUNT', count] : [];
        const args = [key, member, radius, unit, _withCoord, _withDist, _withHash, ..._count, order].filter(k => !!k);
        this.send_command('georadius', args);
        return this;
    }
    exec() {
        return new Promise((resolve, reject) => {
            this.redisMulti.exec((err, ret) => {
                if (!err) {
                    resolve(ret);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}
function createConnRedis(redisClient) {
    return new ConnRedis(redisClient);
}
exports.createConnRedis = createConnRedis;
exports.default = createConnRedis;
//# sourceMappingURL=redis-promisified.js.map
const assert=require('node:assert/strict');
const {inspectIP}=require('./app.js');
for(const s of ['0.0.0.0','192.168.1.1','255.255.255.255','::1','2001:db8::1','::ffff:192.0.2.1'])assert.ok(inspectIP(s),s);
for(const s of ['256.1.1.1','01.1.1.1','1.2.3','1.2.3.4:80','abc',':::',':1','2001::db8::1','<script>','[::1]','fe80::1%eth0'])assert.equal(inspectIP(s),null,s);
assert.equal(inspectIP('2001:0DB8:0000:0000:0000:0000:0000:0001').address,'2001:db8::1');
console.log('IP parsing: valid IPv4/IPv6, normalization, and invalid inputs passed.');

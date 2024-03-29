

/**
 * Store bits in array
 *
 * @version  0.1
 * @author   Lauri Rooden - https://github.com/lauriro/bitArray.js
 * @license  MIT License  - http://lauri.rooden.ee/mit-license.txt
 */



!function(root) {

	function bitArray() {
		this.arr = []
	}

	bitArray.prototype = {
		set: function(bit) {
			this.arr[bit>>>5] |= 1 << (bit&0xff)
		},
		get: function(bit) {
			return 1 & (this.arr[bit>>>5] >>> (bit&0xff))
		},
		clear: function(bit) {
			this.arr[bit>>>5] &= ~(1 << (bit&0xff))
		},
		count: function() {
			var v
			, sum = 0
			, min = 0
			, arr = this.arr
			, max = arr.length

			while (max--) {
				v = arr[max]
				v -= (v >> 1) & 0x55555555
				v = (v & 0x33333333) + ((v >> 2) & 0x33333333)
				sum += ((v + (v >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
			}
			return sum
		},
		toString: function() {
			return this.arr.map(function(val){
				return ((val>>>0).toString(2).split("").reverse().join("")+"0000000000000000000000000000000").slice(0, 32)
			}).join("").replace(/0+$/, "")
		}
	}

	root.bitArray = bitArray

}(this)



/** Tests
!function(){
	var arr = new bitArray()

	arr.set(1)
	arr.set(11)
	arr.set(40)
	arr.set(5)
	arr.clear(11)

	TestCase("bitArray").compare(
		arr.toString()
		, "01000100000000000000000000000000000000001"
		, arr.get(0)
		, 0
		, arr.get(1)
		, 1
		, arr.count()
		, 3
	).done()

}()
//*/


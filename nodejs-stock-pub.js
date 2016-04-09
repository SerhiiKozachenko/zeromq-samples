var zmq = require('zmq');

var socket = zmq.socket('pub');
socket.identity = 'stockpuber';

var stocks = ['AAPL', 'GOOG', 'YHOO', 'MSFT', 'INTC'];

function _getRandomStockName(){
  return stocks[Math.floor(Math.random()*stocks.length)];
}

function _getRandomStockValue(){
  return Math.random()*1000;
}

socket.bind('tcp://127.0.0.1:12345', function(err) {
  if (err) throw err;

  console.log('stockpuber socket bound!');

  setInterval(function(){
    var symbol = _getRandomStockName();
    var value = _getRandomStockValue();

    socket.send(symbol + ' ' + value);
    console.log(socket.identity + ': sent ' + symbol + ' ' + value);
  }, 100);
});

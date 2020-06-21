const mongoose = require('mongoose');


const accountSchema = new mongoose.Schema({
    category : {
        type: 'String',
        enum: ['Visa', 'MasterCard', 'Chequing', 'Savings'],
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    accountNumber: {
        type: String,
        default: function() {
            let type = this.category;
            
            let digits = Math.floor(Math.random()* (999999999999-100000000000+1)+100000000000);

            if(type === 'Visa') return `5167${digits}`;
            if(type === 'MasterCard') return `5177${digits}`;
            if(type === 'Chequing') return `5187${digits}`;
            if(type === 'Savings') return `5197${digits}`;
        },
        required: true
    },
    hiddenAccountNumber: {
        type: String,
        default: function() {
           let num = this.accountNumber;
            let hiddenNumber = `${num.split('').slice(0,4).join('')} **** **** ${num.split('').slice(12,16).join('')}`

            return hiddenNumber;
        },
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});



const Account = mongoose.model('Account', accountSchema, 'accounts');

exports.Account= Account;
exports.accountSchema = accountSchema;
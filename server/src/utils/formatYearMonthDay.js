"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatYearMonthDay = (date) => date.toISOString().slice(0, 10);
exports.default = formatYearMonthDay;

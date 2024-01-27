import { combineReducers } from '@reduxjs/toolkit';
import investmentResults from '@/redux/investment-results/reducer';
import smartAnalyzer from '@/redux/smart-analyzer/reducer';

export default combineReducers({
  investmentResults,
  smartAnalyzer,
});

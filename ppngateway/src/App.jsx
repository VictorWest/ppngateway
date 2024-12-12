import React from "react"
import Sidebar from "./components/Sidebar.jsx"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from "./pages/Dashboard.jsx"
import Transactions from "./pages/Transactions.jsx"
import Batches from "./pages/Batches.jsx"
import InvoiceList from "./pages/InvoiceList.jsx"
import CustomerList from "./pages/CustomerList.jsx"
import Recurring from "./pages/Recurring.jsx"
import ReportSchedule from "./pages/ReportSchedule.jsx"
import ReportTransactions from "./pages/ReportTransactions.jsx"
import PaymentPageList from "./pages/PaymentPageList.jsx"
import PaymentPageNew from "./pages/PaymentPageNew.jsx"
import FraudControls from "./pages/FraudControls.jsx"
import ControlPanel from "./pages/ControlPanel.jsx"
import Navbar from "./components/Navbar.jsx"

function App() {
  return (
    <div className="flex">
      <Router>
        <div className="w-1/5">
          <Sidebar/>  
        </div>
        <div className="w-4/5">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard"/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/transaction" element={<Transactions/>}/>
            <Route path="/batches" element={<Batches/>}/>
            <Route path="/invoice/list" element={<InvoiceList/>}/>
            <Route path="/invoice" element={<Navigate to ="/invoice/list"/>}/>
            <Route path="/customer/list" element={<CustomerList/>}/>
            <Route path="/recurring" element={<Recurring/>}/>
            <Route path="/reports/transactions" element={<ReportTransactions/>}/>
            <Route path="/reports/schedule" element={<ReportSchedule/>}/>
            <Route path="/payment-pages/list" element={<PaymentPageList/>}/>
            <Route path="/payment-pages/save" element={<PaymentPageNew/>}/>
            <Route path="/fraud-center" element={<FraudControls/>}/>
            <Route path="/control-panel" element={<ControlPanel/>}/>
          </Routes>
        </div>

      </Router>    
    </div>

  )
}

export default App

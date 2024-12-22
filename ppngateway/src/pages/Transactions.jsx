import React, { useContext, useEffect, useState} from 'react'
import { StateContext } from '../store/ContextStore'
import { MdCancel } from "react-icons/md";
import { customerData } from '../utils/data';
import { GoTriangleDown } from "react-icons/go";
import Input from '../components/Input';
import { IoIosInformationCircle } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaMoneyBills } from "react-icons/fa6";
import { BsBoxSeamFill } from "react-icons/bs";

export default function Transactions() {
  const {darkMode} = useContext(StateContext)
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown open/close
  const [selectedOption, setSelectedOption] = useState(); // Selected option
  const [typeInfoOpen, setTypeInfoOpen] = useState(false)
  const [totalAmount, setTotalAmount] = useState({
    amount: 0,
    surchage: 0,
    total: 0.00,
  })
  const [detailsAreOpen, setDetailsAreOpen] = useState({
    transaction: false,
    billing: false,
    recurring: false
  })
  const [transDetailsShow, setTransDetailsShow] = useState({
    invoice: false,
    po: false,
    description: false
  })
  const [transValueShow, setTransValueShow] = useState({
    invoice: '',
    po: '',
    description: ''
  })
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  }
  const [billingInfoShow, setBillingInfoShow] = useState({
    first: '',
    last: '',
    street: ''
  })

  useEffect(() => {
    const total = parseFloat(totalAmount.amount) + ((parseFloat(totalAmount.surchage) / 100) * parseFloat(totalAmount.amount)) 
    setTotalAmount(prev => ({...prev, total: total}))
  }, [totalAmount.amount, totalAmount.surchage])
  
  return (
    <div className='relative'>
        <div className={`flex items-center text-2xl font-bold ${darkMode ? 'text-[#B8BBC7]' : 'text-[#22222B]'}  gap-5 mb-4 px-5 py-4 `}>
          <i className="fa-solid fa-dollar-sign text-[#BA77FF]"></i>
          <p>Process Transactions</p>
        </div>
        <div className='flex items-center justify-between px-12'>
          <p className='text-[#6B91FE] uppercase border-b-2 pb-3 border-[#6B91FE] z-10'>Check</p>
          <div className='bg-[#F96E6E] w-fit text-white px-2 py-1 flex items-center gap-2 mb-2'>
            <div className='text-xl'><MdCancel /></div>
            <p>Clear Form</p>
          </div>
        </div>
        {/* Form Box */}
        <div className='py-8 border-2 border-gray-500 mx-8 h-[110vh]'>
          {/* Customer List */}
          <div className='relative mx-8 text-gray-300 text-sm font-light'>
            <div className='flex justify-between items-center'>
              {selectedOption && <label htmlFor="">Customer</label>}
              <div onClick={() => setIsOpen(prev => !prev)}
                className='flex items-center justify-between bg-[#313242] w-2/5 h-10 
                    border border-gray-600 rounded-sm  cursor-pointer group hover:bg-[#4C4D5A] mb-12 mt-1'>
                <input required type="text" value={selectedOption ? `${selectedOption.nameOnCheck}-${selectedOption['16_digit_address_number']} (${selectedOption.two_word_address})` : ''} className='bg-[#313242] px-2 group-hover:bg-[#4C4D5A] outline-none w-[90%] text-white cursor-pointer' placeholder='Customer'/>
                <div className='text-[#6B7280] text-xl'><GoTriangleDown /></div>
                <div className='absolute top-[3rem] text-xs'>Select or enter a customer name</div>
              </div> 
              <div className='text-lg flex flex-col items-center ml-auto mr-auto cursor-pointer hover:text-white -mt-10 gap-1'>
                <p>Charge</p>
                <div className='text-4xl flex items-center justify-center bg-[#7493FE] p-2 rounded-full text-white'><RiMoneyDollarCircleLine/></div>
              </div>              
            </div>

            <div>
              {isOpen && <ul className='absolute top-10 bg-[#404153] text-white text-lg w-fit mt-2 h-64 overflow-y-auto custom-scrollbar z-10'>
                  {customerData.map((item) => {
                    return <li onClick={() => handleOptionClick(item)}
                      className='p-3 hover:bg-[#313242] cursor-pointer'>{item.nameOnCheck}-{item['16_digit_address_number']} ({item.two_word_address})</li>
                  })}
              </ul>}              
            </div>
            <hr className="w-full border-t border-gray-500 mb-12" />
           
            <div className='flex justify-between items-center gap-4'>
               {/* Main Form */}
              <form action="" className='w-1/2'>
                <div>
                  {selectedOption && <label htmlFor="">Name on Check *</label>}
                  <Input>
                    <input required type="text" className='bg-[#313242] px-2 group-hover:bg-[#4C4D5A] outline-none w-[90%] text-white cursor-pointer' placeholder='Name on Check*'
                    value={selectedOption ? selectedOption.nameOnCheck: ''}
                    />
                  </Input>
                </div>
                <div className="flex flex-wrap justify-between mt-5 gap-y-5">
                  <div>
                    {selectedOption && <label htmlFor="accountType">Account Type *</label>}
                    <Input>
                      <input
                        id="accountType"
                        required
                        type="text"
                        className="bg-transparent px-2 outline-none  text-white"
                        placeholder="Account Type *"
                        value={selectedOption ? selectedOption.account_Type: ''}
                      />
                    </Input>
                  </div>
                  <div>
                    {selectedOption && <label htmlFor="transactionType">Transaction Type *</label>}
                    <Input>
                      <input
                        id="transactionType"
                        required
                        type="text"
                        className="bg-transparent px-2 outline-none  text-white"
                        placeholder="Transaction Type *"
                        value={selectedOption ? selectedOption.transaction_Type: ''}
                      />
                    </Input>
                  </div>
                  <div>
                    {selectedOption && <label htmlFor="routingNumber">Routing Number *</label>}
                    <Input>
                      <input
                        id="routingNumber"
                        required
                        type="text"
                        className="bg-transparent px-2 outline-none text-white"
                        placeholder="Routing Number *"
                        value={selectedOption ? selectedOption.routing_Number: ''}
                      />
                    </Input>
                  </div>
                  <div>
                    {selectedOption && <label htmlFor="accountNumber">Account Number *</label>}
                    <Input>
                      <input
                        id="accountNumber"
                        required
                        type="text"
                        className="bg-transparent px-2 outline-none w-full text-white"
                        placeholder="Account Number *"
                        value={selectedOption ? selectedOption.account_Number: ''}
                      />
                    </Input>
                  </div>
                </div>
              </form>
              {/* Receipt Paper */}
              <div className="relative w-1/2 bg-[#4B4D5E] h-64 flex flex-col justify-center font-normal px-10 rounded-lg shadow-md text-white">
                <h2 className="absolute top-5 left-0 right-0 text-center font-medium text-lg">
                  Process Transaction Check
                </h2>
                <div className="mt-10 space-y-3">
                  {[
                    { label: "Name on Check", value: selectedOption?.nameOnCheck || "Required" },
                    { label: "Account Type", value: selectedOption?.account_Type || "Required" },
                    { label: "Transaction Type", value: selectedOption?.transaction_Type || "Required" },
                    { label: "Routing Number", value: selectedOption?.routing_Number || "Required" },
                    { label: "Account Number", value: selectedOption?.account_Number || "Required" },
                  ].map((item, index) => (
                    <p key={index} className="flex items-center">
                      <span>{item.label}</span>
                      <span className="flex-grow border-dashed border-t border-white border-[1.2px] mx-1"></span>
                      <span>{item.value}</span>
                    </p>
                  ))}
                </div>
              </div>
            
            </div>
            {/* Amount entry */}
            <div className='flex gap-3'>
              <div className='flex items-center bg-[#313242] w-fit p-2 gap-2'>
                <div className='text-lg text-white font-medium w-3'>$</div>
                <input type="number" placeholder='Amount*'className='bg-[#313242] w-20 outline-none' onChange={(e) => {
                    setTotalAmount((prev) => ({ ...prev, amount: parseFloat(e.target.value) }))
                }} 
                />
              </div>

              {/* Sucharge Entry */}
              <div className='flex items-center bg-[#313242] w-fit p-2 gap-2 relative'>
                <input type="number" placeholder='Surcharge*'className='bg-[#313242] w-20 outline-none' onChange={(e) => {
                    setTotalAmount((prev) => ({ ...prev, surchage: parseFloat(e.target.value) }))
                }} />
                <div className='text-lg text-white font-medium w-3'>%</div>
                <div className='absolute -top-5 right-0 flex flex-col' 
                  onMouseEnter={() => setTypeInfoOpen(true)} onMouseLeave={() => setTypeInfoOpen(false)}>
                  <IoIosInformationCircle/>
                </div>
                {typeInfoOpen && <div className='absolute text-center bg-[#cac5ca] text-black font-normal w-[200%] p-3 rounded-md -top-20'>Type can be changed in Settings</div>}
              </div>
              {/* Total Entry */}
              <div className='flex items-center bg-[#636363] w-fit p-2 gap-2 text-xl'>
              <div className='text-lg text-white font-medium w-3'>$</div>
                <input type="number" placeholder='0.00'className='bg-[#636363] w-20 outline-none' value={totalAmount.total || 0}/>
              </div>
            </div>
            {/* Email Reg */}
            <div className='w-fit my-10 flex gap-5'>
              <div>
                <input type="text" className='bg-[#313242] p-2 outline-none' placeholder='Email'/>
              </div>
              <div className='flex gap-2 text-lg items-center'>
                <input type="checkbox" className='cursor-pointer'/>
                <label htmlFor="">Customer receipt</label>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className='bg-[#404153] mx-8 mt-10 h-10 text-white flex items-center p-5 cursor-pointer hover:bg-[#494b63]' onClick={() => setDetailsAreOpen(prev => ({...prev, transaction: !prev.transaction}))}>
          Transaction Details
          <div className={`ml-auto ${detailsAreOpen.transaction && 'rotate-180'}`}><GoTriangleDown/></div>
        </div>

        {detailsAreOpen.transaction && <div className='mx-8 py-8 h-48 border-2 border-t-0 border-gray-500 px-5 flex items-center justify-center text-[#5F93FE] gap-5' >
            <div className='relative' onFocus={() => setTransDetailsShow({
                invoice: true,
                po: false,
                description: false
              })} onBlur={() =>  setTransDetailsShow(prev => ({
                ...prev,
                invoice: false
              }))}>
              {(transDetailsShow.invoice || transValueShow.invoice !== '') && <label htmlFor="" className='absolute -top-7 left-0'>Invoice Number</label>}
              <input type="text" className='bg-[#313242] p-2 outline-none text-white' placeholder={!transDetailsShow.invoice && `Invoice Number`} onChange={(e) => setTransValueShow(prev => ({...prev, invoice: e.target.value}))}/>
            </div>
            <div className='relative' onFocus={() => setTransDetailsShow({
                invoice: false,
                po: true,
                description: false
              })} onBlur={() =>  setTransDetailsShow(prev => ({
                ...prev,
                po: false
              }))}>
              {(transDetailsShow.po || transValueShow.po !== '') && <label htmlFor="" className='absolute -top-7 left-0'>PO Number</label>}
              <input type="text" className='bg-[#313242] p-2 outline-none text-white' placeholder={!transDetailsShow.po && `PO Number`} onChange={(e) => setTransValueShow(prev => ({...prev, po: e.target.value}))}/>
            </div>
            <div className='relative' onFocus={() => setTransDetailsShow({
                invoice: false,
                po: false,
                description: true
              })} onBlur={() =>  setTransDetailsShow(prev => ({
                ...prev,
                description: false
              }))}>
              {(transDetailsShow.description || transValueShow.description !== '') && <label htmlFor="" className='absolute -top-7 left-0'>Description</label>}
              <input type="text" className='bg-[#313242] p-2 outline-none text-white' placeholder={!transDetailsShow.description && `Description`} onChange={(e) => setTransValueShow(prev => ({...prev, description: e.target.value}))}/>
            </div>
        </div>}

        {/* Billing & Shipping Info */}
        <div className='bg-[#404153] mx-8 mt-5 h-10 text-white flex items-center p-5 cursor-pointer hover:bg-[#494b63]' onClick={() => setDetailsAreOpen(prev => ({...prev, billing: !prev.billing}))}>
          Billing and Shopping Info
          <div className={`ml-auto ${detailsAreOpen.transaction && 'rotate-180'}`}><GoTriangleDown/></div>
        </div>
        <div className='mx-8 py-8 h-[96rem] border-2 border-t-0 border-gray-500 px-5 relative'>
          <div className='flex items-center justify-center gap-5 text-gray-500  text-2xl'>
            {/* Billing-Shipping headers */}
            <div className='flex items-center justify-between border-2 border-dashed border-gray-400 w-1/2 h-32 p-5'>
              <div className='text-8xl absolute top-10'><FaMoneyBills/></div>
              <p className='mx-auto'>Billing</p>
            </div>
            <div className='flex items-center justify-between border-2 border-dashed border-gray-400 w-1/2 h-32 p-5'>
              <div className='text-7xl'><BsBoxSeamFill/></div>
              <p className='ml-auto mr-auto'>Shipping</p>
              <div className='flex gap-2 text-lg items-center w-24 text-white'>
                  <input type="checkbox" className='cursor-pointer'/>
                  <label htmlFor="">Same as Billing</label>
              </div>
            </div>
          </div>  
            <div className='flex items-center justify-center gap-5'>
              <form action="">
                <div className='relative' onFocus={() => setTransDetailsShow({
                    invoice: true,
                    po: false,
                    description: false
                  })} onBlur={() =>  setTransDetailsShow(prev => ({
                    ...prev,
                    invoice: false
                  }))}>
                  {(transDetailsShow.invoice || transValueShow.invoice !== '') && <label htmlFor="" className='absolute -top-7 left-0'>Invoice Number</label>}
                  <input type="text" className='bg-[#313242] p-2 outline-none text-white' placeholder={!transDetailsShow.invoice && `Invoice Number`} onChange={(e) => setTransValueShow(prev => ({...prev, invoice: e.target.value}))}/>
                </div>
                <div className='relative' onFocus={() => setTransDetailsShow({
                    invoice: true,
                    po: false,
                    description: false
                  })} onBlur={() =>  setTransDetailsShow(prev => ({
                    ...prev,
                    invoice: false
                  }))}>
                  {(transDetailsShow.invoice || transValueShow.invoice !== '') && <label htmlFor="" className='absolute -top-7 left-0'>Invoice Number</label>}
                  <input type="text" className='bg-[#313242] p-2 outline-none text-white' placeholder={!transDetailsShow.invoice && `Invoice Number`} onChange={(e) => setTransValueShow(prev => ({...prev, invoice: e.target.value}))}/>
                </div>
                <div className='relative' onFocus={() => setTransDetailsShow({
                    invoice: true,
                    po: false,
                    description: false
                  })} onBlur={() =>  setTransDetailsShow(prev => ({
                    ...prev,
                    invoice: false
                  }))}>
                  {(transDetailsShow.invoice || transValueShow.invoice !== '') && <label htmlFor="" className='absolute -top-7 left-0'>Invoice Number</label>}
                  <input type="text" className='bg-[#313242] p-2 outline-none text-white' placeholder={!transDetailsShow.invoice && `Invoice Number`} onChange={(e) => setTransValueShow(prev => ({...prev, invoice: e.target.value}))}/>
                </div>
                <div className='relative' onFocus={() => setTransDetailsShow({
                    invoice: true,
                    po: false,
                    description: false
                  })} onBlur={() =>  setTransDetailsShow(prev => ({
                    ...prev,
                    invoice: false
                  }))}>
                  {(transDetailsShow.invoice || transValueShow.invoice !== '') && <label htmlFor="" className='absolute -top-7 left-0'>Invoice Number</label>}
                  <input type="text" className='bg-[#313242] p-2 outline-none text-white' placeholder={!transDetailsShow.invoice && `Invoice Number`} onChange={(e) => setTransValueShow(prev => ({...prev, invoice: e.target.value}))}/>
                </div>
                <div className='relative' onFocus={() => setTransDetailsShow({
                    invoice: true,
                    po: false,
                    description: false
                  })} onBlur={() =>  setTransDetailsShow(prev => ({
                    ...prev,
                    invoice: false
                  }))}>
                  {(transDetailsShow.invoice || transValueShow.invoice !== '') && <label htmlFor="" className='absolute -top-7 left-0'>Invoice Number</label>}
                  <input type="text" className='bg-[#313242] p-2 outline-none text-white' placeholder={!transDetailsShow.invoice && `Invoice Number`} onChange={(e) => setTransValueShow(prev => ({...prev, invoice: e.target.value}))}/>
                </div>
              </form>
          </div>        
        </div>


        {/* Footer */}
        <div className='sticky bottom-0 bg-[#404153] text-[#B7BBC2] h-14 flex items-center justify-center'>
          <div className='flex items-center gap-3 ml-auto -mr-5'>
            <IoIosInformationCircle/>
            <p>To create a new customer, enter new customer</p>
          </div>
          
          <div className='ml-auto  flex gap-3 items-center'>
            <div className='text-white text-lg'>Total: ${totalAmount.total || '0.00'}</div>
            <div className='flex items-center gap-1 bg-[#7493FE] text-white h-8 mr-10 rounded-sm'>
              <div className='text-xl h-full bg-[#5970c4] flex justify-center items-center px-2 rounded-s-sm'><IoMdCheckmark/></div>
              <p className='px-2'>Process Transaction</p>
            </div>
          </div>
        </div>
    </div>
  )
}

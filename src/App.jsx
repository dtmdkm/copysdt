import React, { useState } from 'react'

function App() {
  const [inputText, setInputText] = useState('')
  const [phoneList, setPhoneList] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)

  const handleCreateList = () => {
    // Split by new line, remove empty lines and trim spaces
    const lines = inputText.split('\n')
    const numbers = lines
      .map(line => line.trim())
      .filter(line => line.length > 0)
    setPhoneList(numbers)
  }

  const handleCopy = (number, index) => {
    navigator.clipboard.writeText(number).then(() => {
      setCopiedIndex(index)
      setTimeout(() => {
        setCopiedIndex(null)
      }, 2000)
    })
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Danh Sách Số Điện Thoại</h1>
        
        <label className="input-label">Dán danh sách (mỗi số 1 dòng):</label>
        <textarea 
          className="textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="0912345678&#10;0988888888"
        />
        
        <button className="btn-submit" onClick={handleCreateList}>
          Tạo Danh Sách
        </button>

        {phoneList.length === 0 ? (
          <div className="empty-state">
            Chưa có dữ liệu số điện thoại
          </div>
        ) : (
          <>
            <div className="list-header">
              <span>Tổng số: {phoneList.length}</span>
              <span>Chạm để copy nhanh</span>
            </div>
            
            <div className="list-container">
              {phoneList.map((phone, index) => (
                <div key={index} className="list-item">
                  <div className="item-left">
                    <span className="item-index">{index + 1}</span>
                    <span className="item-number">{phone}</span>
                  </div>
                  <button 
                    className={`btn-copy ${copiedIndex === index ? 'copied' : ''}`}
                    onClick={() => handleCopy(phone, index)}
                  >
                    {copiedIndex === index ? 'Đã copy' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App

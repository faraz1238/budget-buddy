import React from 'react'
import Protected from '../../utils/Protected'

export default function AboutUs() {
  return (
      <div>
          <Protected/>
          <h1>About Us</h1>
          <p>Expense Tracker Plus is a reliable and efficient web application designed to simplify expense tracking and help users achieve better financial management. Our platform aims to empower individuals to take control of their finances and make informed decisions.</p>
          <h3>Our Mission</h3>
          <p>
          At Expense Tracker Plus, our mission is to provide users with a seamless and intuitive experience in managing their expenses and incomes. We strive to offer a secure environment that ensures the privacy and confidentiality of users' financial data. By delivering valuable insights and tools, we aim to help users make sound financial choices and improve their financial well-being.
          </p>
          <h3>Key Features</h3>
          <ul style={{textAlign:'left'}}>
              <li><strong>Expense and Income Tracking:</strong> Our platform allows users to effortlessly record and categorize their expenses and incomes. By maintaining a comprehensive transaction history, users gain a clear understanding of their financial activities.</li>
              <li><strong>Transaction Overview: </strong> Expense Tracker Plus provides users with a convenient overview of their transactions for the last week and month. This feature enables users to monitor their spending patterns and identify areas where they can make adjustments to achieve financial goals.</li>
              <li><strong>Secure Login:</strong> We prioritize the security of our users' data. With a robust login process, we ensure that only authorized individuals can access the platform, providing peace of mind and protecting sensitive financial information.</li>
              <li><strong>Monthly Transaction Table:</strong> Expense Tracker Plus offers the ability to download a monthly transaction table as a PDF file. This feature allows users to keep comprehensive records and generate reports for further analysis and budget planning.</li>
          </ul>
        
    </div>
  )
}

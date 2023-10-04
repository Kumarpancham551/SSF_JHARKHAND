
import './globals.css';
import { ToastContainer, toast } from 'react-toastify';
import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'jhssf.com',
  description: 'Best money saving and loan provider startup',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
       <div className='mt-2'> {children}</div>        
       
        
        </body>
    </html>
  )
}

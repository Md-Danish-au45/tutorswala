import './globals.css'

export const metadata = {
  title: 'Tutorswala - Quality Tutoring',
  description: 'Connecting students with expert tutors',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
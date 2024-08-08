import './globals.css';

export const metadata = {
  title: 'Hotel Offers',
  description: 'Find the best hotel offers!',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">Hotel Finder</h1>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2024 Hotel Finder. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

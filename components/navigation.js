// Import the Link component from Next.js for client-side navigation
import Link from 'next/link';
// Import useRouter from Next.js to detect the current route for active state
import { useRouter } from 'next/router';
// Import Bootstrap Navbar components for consistent styling
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// Define and export the Navigation component
export default function Navigation() {
  // Get the current route pathname
  const router = useRouter();
  const currentPath = router.pathname;

  // Define navigation links with their paths and labels
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/posts', label: 'Blog Posts' },
    { path: '/contacts', label: 'Contacts' },
    { path: '/products', label: 'Products' },
    { path: '/transactions', label: 'Transactions' },
    { path: '/snacks', label: 'Snacks' },
    { path: '/places', label: 'Places' },
  ];

  // The component returns JSX to be rendered
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="w-100 mb-4" style={{ marginTop: 0, padding: 0 }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-center w-100">
          {navLinks.map((link) => {
            // Check if current path matches the link path
            const isActive = currentPath === link.path || 
              (link.path !== '/' && currentPath.startsWith(link.path));
            
            return (
              <Nav.Link
                key={link.path}
                as={Link}
                href={link.path}
                active={isActive}
                className={`${isActive ? 'fw-bold' : ''} px-3`}
              >
                {link.label}
              </Nav.Link>
            );
          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


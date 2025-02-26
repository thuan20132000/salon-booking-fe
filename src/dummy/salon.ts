
import { Salon, Technician, Service, Customer } from '../interfaces/salon';


// generate 6 salons dummy from Salon interface
export const SALON: Salon = {
  id: 1,
  name: 'Salon A',
  address: '123 Main St, Anytown, USA',
  phone: '123-456-7890',
  email: 'salon@example.com',
  website: 'www.salona.com',
  logo: 'https://via.placeholder.com/150',
  description: 'Salon A is a modern and stylish salon that offers a range of beauty and grooming services.',
  created_at: '2021-01-01',
  updated_at: '2021-01-01',
};


// generate 6 technicians dummy from Technician interface
export const SALON_TECHNICIANS: Technician[] = [
  { id: 1, name: 'Jonathan', avatar: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Ethan', avatar: 'https://via.placeholder.com/150' },
  { id: 3, name: 'John', avatar: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Jake', avatar: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Jill', avatar: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Doe', avatar: 'https://via.placeholder.com/150' },
];


// generate 12 services dummy from Service interface for nail salon
export const SALON_SERVICES: Service[] = [
  {
    id: 1,
    name: "Classic Manicure",
    price: 25,
    duration: 30, // duration in minutes
  },
  {
    id: 2,
    name: "Gel Manicure",
    price: 35,
    duration: 45,
  },
  {
    id: 3,
    name: "Classic Pedicure",
    price: 35,
    duration: 45,
  },
  {
    id: 4,
    name: "Deluxe Pedicure",
    price: 50,
    duration: 60,
  },
  {
    id: 5,
    name: "Gel Pedicure",
    price: 45,
    duration: 60,
  },
  {
    id: 6,
    name: "Nail Art (per nail)",
    price: 5,
    duration: 10,
  },
  {
    id: 7,
    name: "Full Set Acrylic",
    price: 70,
    duration: 90,
  },
  {
    id: 8,
    name: "Acrylic Fill",
    price: 45,
    duration: 60,
  },
  {
    id: 9,
    name: "Dip Powder",
    price: 45,
    duration: 60,
  },
  {
    id: 10,
    name: "Gel Extensions",
    price: 80,
    duration: 90,
  },
  {
    id: 11,
    name: "Polish Change (Hands)",
    price: 15,
    duration: 15,
  },
  {
    id: 12,
    name: "Polish Change (Feet)",
    price: 15,
    duration: 15,
  },
  {
    id: 13,
    name: "Nail Repair (per nail)",
    price: 8,
    duration: 15,
  },
  {
    id: 14,
    name: "Acrylic Removal",
    price: 25,
    duration: 30,
  },
  {
    id: 15,
    name: "Gel Removal",
    price: 15,
    duration: 20,
  },
  {
    id: 16,
    name: "Paraffin Treatment (Hands)",
    price: 20,
    duration: 20,
  },
  {
    id: 17,
    name: "Paraffin Treatment (Feet)",
    price: 25,
    duration: 20,
  },
  {
    id: 18,
    name: "French Add-On",
    price: 10,
    duration: 15,
  },
  {
    id: 19,
    name: "Kids Manicure",
    price: 20,
    duration: 25,
  },
  {
    id: 20,
    name: "Kids Pedicure",
    price: 30,
    duration: 35,
  },
];

// generate 12 customers dummy from Customer interface
export const SALON_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    phone: "555-123-4567",
    email: "sarah.j@email.com"
  },
  {
    id: 2,
    name: "Michael Chen",
    phone: "555-234-5678",
    email: "mchen@email.com"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    phone: "555-345-6789",
    email: "emily.r@email.com"
  },
  {
    id: 4,
    name: "James Wilson",
    phone: "555-456-7890",
    email: "jwilson@email.com"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    phone: "555-567-8901",
    email: "lisa.t@email.com"
  },
  {
    id: 6,
    name: "David Kim",
    phone: "555-678-9012",
    email: "dkim@email.com"
  },
  {
    id: 7,
    name: "Jessica Patel",
    phone: "555-789-0123",
    email: "jpatel@email.com"
  },
  {
    id: 8,
    name: "Robert Martinez",
    phone: "555-890-1234",
    email: "rmartinez@email.com"
  },
  {
    id: 9,
    name: "Amanda Lee",
    phone: "555-901-2345",
    email: "alee@email.com"
  },
  {
    id: 10,
    name: "Thomas Brown",
    phone: "555-012-3456",
    email: "tbrown@email.com"
  },
  {
    id: 11,
    name: "Maria Garcia",
    phone: "555-234-5678",
    email: "mgarcia@email.com"
  },
  {
    id: 12,
    name: "Jennifer Wong",
    phone: "555-345-6789",
    email: "jwong@email.com"
  }
];
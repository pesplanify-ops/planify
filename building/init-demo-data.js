// Demo Data Initialization Script
// This script adds sample data to the server on startup

const demoConsultations = [
    {
        id: 'demo-consultation-1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@example.com',
        phone: '+91 9876543210',
        service: 'house_plan',
        message: 'Looking for a modern 3 BHK house plan for my 30x40 plot in Bangalore. Need Vastu compliant design.',
        plotSize: '30x40 feet',
        budget: '₹ 8-10 lakhs',
        timeline: '2-3 months',
        status: 'pending',
        createdAt: new Date('2025-10-15')
    },
    {
        id: 'demo-consultation-2',
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 9123456789',
        service: 'elevation',
        message: 'Need 3D elevation design for my contemporary villa. Focus on modern architecture with glass elements.',
        plotSize: '50x60 feet',
        budget: '₹ 15-18 lakhs',
        timeline: '1 month',
        status: 'in_progress',
        createdAt: new Date('2025-10-12')
    },
    {
        id: 'demo-consultation-3',
        name: 'Amit Patel',
        email: 'amit.patel@example.com',
        phone: '+91 9988776655',
        service: 'cad',
        message: 'Require CAD drafting services for residential complex. Total 8 units with common area.',
        plotSize: '100x120 feet',
        budget: '₹ 25-30 lakhs',
        timeline: '3-4 months',
        status: 'completed',
        createdAt: new Date('2025-10-08')
    }
];

const demoProjects = [
    {
        id: 'demo-project-1',
        title: 'Modern Family Home - Whitefield',
        description: 'Contemporary 4 BHK duplex with open floor plan, modern kitchen, and rooftop terrace.',
        type: 'house_plan',
        budget: 150000,
        plotSize: '40x60 feet',
        requirements: 'Vastu compliant, energy efficient, ample natural light, separate servant quarter',
        status: 'in_progress',
        userId: 'demo-user',
        userEmail: 'demo@planify.com',
        createdAt: new Date('2025-10-10')
    },
    {
        id: 'demo-project-2',
        title: 'Luxury Villa Elevation Design',
        description: 'Premium villa with classical architecture, focusing on grandeur and elegance.',
        type: 'elevation',
        budget: 200000,
        plotSize: '60x80 feet',
        requirements: 'Classical columns, ornate details, landscaped garden visualization, night view renders',
        status: 'completed',
        userId: 'demo-user',
        userEmail: 'demo@planify.com',
        createdAt: new Date('2025-10-05')
    },
    {
        id: 'demo-project-3',
        title: 'Compact Urban House',
        description: 'Efficient 2 BHK design for small plot, maximizing space utilization.',
        type: 'house_plan',
        budget: 80000,
        plotSize: '20x30 feet',
        requirements: 'Space optimization, smart storage solutions, modern minimalist design',
        status: 'pending',
        userId: 'demo-user',
        userEmail: 'demo@planify.com',
        createdAt: new Date('2025-10-14')
    }
];

module.exports = {
    demoConsultations,
    demoProjects
};


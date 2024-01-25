import React, { useEffect, useState } from 'react';

const API_URL = 'https://docent.cmi.hro.nl/bootb/demo/notes/';

function App() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}?page=${currentPage}`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const jsonData = await response.json();
                setData(jsonData.items);
                setTotalPages(jsonData.pagination.totalPages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentPage]);

    const goToPage = (page) => {
        // Ensure the requested page is within bounds
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-gray-200 p-4">
            <h1 className="text-3xl font-bold mb-4">React Tailwind PRG6 - Jaap Moerkerk</h1>

            {/* Display a card for each item */}
            {data.map(item => (
                <div key={item.id} className="border p-4 mb-4">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p>ID: {item.id}</p>
                    <p>{item.body}</p>
                    <p>Date: {item.date}</p>
                </div>
            ))}

            {/* Pagination controls */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous Page
                </button>

                <p className="text-gray-800">
                    Page {currentPage} of {totalPages}
                </p>

                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next Page
                </button>
            </div>
        </div>
    );
}

export default App;


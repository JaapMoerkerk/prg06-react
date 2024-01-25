import React, { useEffect, useState } from 'react';
import './index.css';
const API_URL = 'https://docent.cmi.hro.nl/bootb/demo/notes/';

function App() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);

    //Modal form state
    const [newItemTitle, setNewItemTitle] = useState("");
    const [newItemBody, setNewItemBody] = useState("");

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

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const goToPage = (page) => {
        // Ensure the requested page is within bounds
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleAddItem = async () =>{
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    title: newItemTitle,
                    body: newItemBody,
                }),
            });

            if (response.ok) {
                //Refresh data
                fetchData();

                //Close modal and clear form values
                setShowAddModal(false);
                setNewItemBody("");
                setNewItemTitle("");
            } else{
                console.error("Error adding new item:", response.statusText);
            }
        } catch (error){
            console.error("Error adding new item:", error);
        }
    };

    return (
        <div className="column home-container">

            {/* "Add A New Item" button */}
            <button
                onClick={() => setShowAddModal(true)}
                className="prim-btn add-btn"
            >
                Add A New Item
            </button>

            {/* Display a card for each item */}
            <div className="row card-container">
            {data.map(item => (
                <div key={item.id} className="card">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p>ID: {item.id}</p>
                    <p>{item.body}</p>
                    <p>Date: {item.date}</p>
                </div>
            ))}
            </div>

            {/* Pagination controls */}
            <div className="row pagination-container">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="prim-btn"
                >
                    Previous Page
                </button>

                <p className="amount-of-pages">
                    Page {currentPage} of {totalPages}
                </p>

                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="prim-btn"
                >
                    Next Page
                </button>
            </div>

            {showAddModal && (
                <div className="modal-container">
                    <div className="modal">
                        <h2 className="modal-title">Add A New Item</h2>
                        <form>
                            <div className="modal-input">
                                <label htmlFor="newItemTitle">Title:</label>
                                <input
                                    type="text"
                                    id="newItemTitle"
                                    value={newItemTitle}
                                    onChange={(e) => setNewItemTitle(e.target.value)}
                                />
                            </div>
                            <div className="modal-input">
                                <label htmlFor="newItemBody">Body:</label>
                                <textarea
                                    id="newItemBody"
                                    value={newItemBody}
                                    onChange={(e) => setNewItemBody(e.target.value)}
                                />
                            </div>
                            <div className="modal-buttons">
                                <button
                                    className="prim-btn"
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="prim-btn"
                                    type="button"
                                    onClick={handleAddItem}
                                >
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;


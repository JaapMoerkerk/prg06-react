import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
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
    const [newItemAuthor, setNewItemAuthor] = useState("");

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

    const handleAddItem = async () => {
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
                    author: newItemAuthor
                }),
            });

            if (response.ok) {
                //Refresh data
                fetchData();

                //Close modal and clear form values
                setShowAddModal(false);
                setNewItemBody("");
                setNewItemTitle("");
                setNewItemAuthor("");
            } else {
                console.error("Error adding new item:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding new item:", error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            const response = await fetch(`${API_URL}${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                },
            });

            if (response.ok) {
                // Refresh data after deletion
                fetchData();
            } else {
                console.error("Error deleting item:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
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

            <h2 className="items-title">Existing Items</h2>

            {/* Display a card for each item */}
            <div className="row card-container">
                {data.map(item => (
                    <div key={item.id} className="card">
                        <h3 className="">{item.title} (#{item.id})</h3>
                        <p>ID: {item.id}</p>
                        <div className="row card-button-container">
                            <Link to={`/details/${item.id}`}>
                                <button className="edit-btn">Details</button>
                            </Link>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteItem(item.id)}
                            >Delete</button>
                        </div>
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
                        <h3 className="modal-title">Add A New Item</h3>
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
                            <div className="modal-input">
                                <label htmlFor="newItemAuthor">Author:</label>
                                <textarea
                                    id="newItemAuthor"
                                    value={newItemAuthor}
                                    onChange={(e) => setNewItemAuthor(e.target.value)}
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


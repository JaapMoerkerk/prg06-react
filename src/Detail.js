import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

const Detail = () => {
    const {itemId} = useParams();
    const [itemDetails, setItemDetails] = useState(null);

    // Modal form state for editing
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedItemTitle, setEditedItemTitle] = useState("");
    const [editedItemBody, setEditedItemBody] = useState("");


    const fetchItemDetails = async () => {
        try {
            const response = await fetch(`https://docent.cmi.hro.nl/bootb/demo/notes/${itemId}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const jsonData = await response.json();
            setItemDetails(jsonData);
        } catch (error) {
            console.error('Error fetching item details:', error);
        }
    };

    useEffect(() => {
        fetchItemDetails();
    }, [itemId]);

    const handleEditClick = () => {
        // Open the edit modal with current item details
        setEditedItemTitle(itemDetails.title);
        setEditedItemBody(itemDetails.body);
        setEditModalOpen(true);
    };

    const handleEditItem = async () => {
        try {
            const response = await fetch(`https://docent.cmi.hro.nl/bootb/demo/notes/${itemId}`, {
                method: 'PUT', // Use PUT method for updating
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'access-control-allow-origin': '*',
                },
                body: JSON.stringify({
                    title: editedItemTitle,
                    body: editedItemBody
                }),
            });

            if (response.ok) {
                // Refresh item details
                fetchItemDetails();

                // Close the edit modal
                setEditModalOpen(false);
            } else {
                console.error("Error editing item:", response.statusText);
            }
        } catch (error) {
            console.error("Error editing item:", error);
        }
    };

    return (
        <div className="column">
            {itemDetails ? (
                <div className="column detail-container">
                    <h2 className="text-xl font-bold"><span>Note: </span>{itemDetails.title}</h2>
                    <h2><span>ID: </span>{itemDetails.id}</h2>
                    <h2><span>Description: </span>{itemDetails.body}</h2>
                    <h2><span>Date and time created: </span>{itemDetails.date}</h2>
                    <div className="row detail-button-container">
                        <Link to={`/`}>
                            <button className="prim-btn detail-btn">Home</button>
                        </Link>
                        <button onClick={handleEditClick} className="prim-btn detail-btn">Edit</button>
                    </div>
                </div>
            ) : (
                <p>Loading item details...</p>
            )}

            {/* Modal for editing the item */}
            {editModalOpen && (
                <div className="modal-container">
                    <div className="modal">
                        <h2 className="modal-title">Edit Item</h2>
                        <form>
                            <div className="modal-input">
                                <label htmlFor="editedItemTitle">Title:</label>
                                <input
                                    type="text"
                                    id="editedItemTitle"
                                    value={editedItemTitle}
                                    onChange={(e) => setEditedItemTitle(e.target.value)}
                                />
                            </div>
                            <div className="modal-input">
                                <label htmlFor="editedItemBody">Body:</label>
                                <textarea
                                    id="editedItemBody"
                                    value={editedItemBody}
                                    onChange={(e) => setEditedItemBody(e.target.value)}
                                />
                            </div>
                            <div className="modal-buttons">
                                <button
                                    className="prim-btn"
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="prim-btn"
                                    type="button"
                                    onClick={handleEditItem}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detail;

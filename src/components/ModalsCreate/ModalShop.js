

export default function Modal() {
    return (
        <>
            <button type="button" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Nova Compra
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Cadastrar Compra</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Example label</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">Another label</label>
                                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
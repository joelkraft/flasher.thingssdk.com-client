import React from "react";

function renderLabel(cond, yes, no) {
    return cond
        ? yes
              ? <span className={`label label-${yes.type}`}>{yes.name}</span>
              : ""
        : no ? <span className={`label label-${no.type}`}>{no.name}</span> : "";
}

const ManifestList = ({ manifests, open }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Version</th>
                    <th>Board</th>
                    <th>Revision</th>
                    <th>Published</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {manifests.map(man => {
                    const {
                        manifest,
                        name,
                        version,
                        board,
                        revision,
                        isAuthor,
                        published
                    } = man;
                    return (
                        <tr
                            key={manifest}
                            data-url={manifest}
                            onClick={()=>{
                                open(man)
                            }}
                        >
                            <td>{name}</td>
                            <td>{version}</td>
                            <td>{board}</td>
                            <td>{revision}</td>
                            <td>
                                {renderLabel(
                                    published,
                                    {
                                        type: "success",
                                        name: "PUBLISHED"
                                    },
                                    {
                                        type: "danger",
                                        name: "UNPUBLISHED"
                                    }
                                )}
                            </td>
                            <td>
                                {renderLabel(isAuthor, {
                                    type: "info",
                                    name: "AUTHOR"
                                })}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ManifestList;
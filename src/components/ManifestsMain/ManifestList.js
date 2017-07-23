import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Label = props =>
    <span className={`label label-${props.type}`}>
        {props.name}
    </span>;

const DeleteButton = ({ onClick }) =>
    <Button bsStyle="danger" bsSize="xs" onClick={onClick}>
        Delete
    </Button>;
const ManifestList = ({ manifests, openManifest, handleDelete, isAdmin }) => {
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
                            onClick={e => {
                                if (e.target.nodeName === "BUTTON") return;
                                openManifest(man);
                            }}
                        >
                            <td>
                                {name}
                            </td>
                            <td>
                                {version}
                            </td>
                            <td>
                                {board}
                            </td>
                            <td>
                                {revision}
                            </td>
                            <td>
                                {published
                                    ? <Label type="success" name="PUBLISHED" />
                                    : <Label
                                          type="unPublished"
                                          name="UNPUBLISHED"
                                      />}
                            </td>
                            <td>
                                {isAuthor
                                    ? <Label type="info" name="AUTHOR" />
                                    : null}
                            </td>
                            <td>
                                {isAuthor || isAdmin
                                    ? <DeleteButton
                                          onClick={() => handleDelete(manifest)}
                                      />
                                    : null}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

ManifestList.propTypes = {
    manifests: PropTypes.array.isRequired,
    openManifest: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default ManifestList;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { proposalInterface } from "../../types/proposalType";
import { format } from "date-fns";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineShareAlt } from "react-icons/ai";
import { Wrapper } from "./SingleCard.style";
import {
  clearSharedProposal,
  deleteProposal,
  editProposal,
  setEditProposal,
  voteProposal,
} from "../../redux/proposal/proposalSlice";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "react-qr-code";

const SingleCard = ({ item }: { item: any }) => {
  const navigate = useNavigate();
  const {
    _id,
    title,
    options,
    capacity,
    chosenProposal,
    active,
    deadline,
    totalVotes,
    createdBy,
  } = item;

  const dispatch = useDispatch();
  const { currentURL } = useSelector((store: any) => store.allProposals);
  const [sharing, setSharing] = useState(false);
  const [copyToClipboard, setCopyToClipboard] = useState(false);
  const proposalUrl = window.location.origin + `/shared/${_id}`;
  const isSharedUrl = window.location.pathname.includes("/shared/");

  if (sharing) {
    return (
      <Wrapper>
        <div className="title">
          <h5>{title}</h5>
          <div className="cap-stats">
            <p>{totalVotes}</p> / <p>{capacity}</p>
          </div>
        </div>
        <div className="stats">
          <div className="stat-group">
            <span>Deadline:</span>
            <h5>{format(new Date(deadline), "yyyy/MM/dd HH:mm bb") || null}</h5>
          </div>
          <div className="stat-group">
            <span>By:</span>
            <p>{createdBy.username}</p>
          </div>
        </div>
        <div className="qr-container">
          <CopyToClipboard text={proposalUrl}>
            <QRCode
              size={256}
              value={proposalUrl}
              viewBox={`0 0 256 256`}
              className="qr-code"
              onClick={() => setCopyToClipboard(true)}
            />
          </CopyToClipboard>
          {copyToClipboard && <h5 className="alert-success">Link Copied!</h5>}
        </div>

        <div className="edit-group">
          <CopyToClipboard text={proposalUrl}>
            <div className="btn" onClick={() => setCopyToClipboard(true)}>
              <h5>Copy Link</h5>
            </div>
          </CopyToClipboard>

          <div
            className="btn"
            onClick={() => {
              setSharing(false);
              setCopyToClipboard(false);
            }}
          >
            <h5>Stop Sharing</h5>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="title">
        <h5>{title}</h5>
        <div className="cap-stats">
          <p>{totalVotes}</p> / <p>{capacity}</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat-group">
          <span>Deadline:</span>
          <h5>{format(new Date(deadline), "yyyy/MM/dd HH:mm bb") || null}</h5>
        </div>
        <div className="stat-group">
          <span>By:</span>
          <p>{createdBy.username}</p>
        </div>
      </div>
      <ul className="list-options">
        {options.map((item: any) => (
          <li
            className={`option-item ${item.selected && "selected"}`}
            key={item._id}
            onClick={() => {
              dispatch(
                voteProposal({
                  proposalId: _id,
                  proposalData: { optionId: item._id },
                })
              );
              if (isSharedUrl) {
                dispatch(clearSharedProposal());
                navigate("/");
              }
            }}
          >
            <p>{item.count || 0}</p>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
      {!active && (
        <table className="result">
          <thead>
            <tr>
              <th>
                <h5>Passed</h5>
              </th>
              <th>
                <h5>Count</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {chosenProposal.map((item: any) => (
              <tr key={item._id}>
                <td>
                  <h5>{item.name}</h5>
                </td>
                <td>
                  <h5>{item.count}</h5>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="edit-group">
        {currentURL === "private" && !isSharedUrl && (
          <>
            <div
              className="btn"
              onClick={() => {
                dispatch(setEditProposal(item));
                navigate("/workshop/create");
              }}
            >
              <FaRegEdit className="icon" />
            </div>
            <div
              className="btn"
              onClick={() => {
                dispatch(deleteProposal(_id));
              }}
            >
              <RiDeleteBinLine className="icon" />
            </div>
          </>
        )}
        {isSharedUrl ? (
          <div
            className="btn"
            onClick={() => {
              dispatch(clearSharedProposal());
              navigate("/");
            }}
          >
            <h5>Vote Later</h5>
          </div>
        ) : (
          <div className="btn" onClick={() => setSharing(true)}>
            <AiOutlineShareAlt className="icon" />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default SingleCard;

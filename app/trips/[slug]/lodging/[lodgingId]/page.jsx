"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import DeleteModal from "components/Common/Modals/DeleteModal";
import LoadingEffect from "components/Common/Loading/LoadingEffect";
import useAuthRedirect from "hooks/useAuthRedirect";
import LodgingInfo from "components/Common/DataDisplay/LodgingInfo";

export default function Page({ params }) {
  const [plan, setPlan] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useAuthRedirect();

  useEffect(() => {
    const docRef = doc(db, "trip", params.slug, "plan", params.lodgingId);
    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        setPlan([{ ...docSnapshot.data(), id: docSnapshot.id }]);
      }
      setIsLoading(false);
    });
  }, [params.slug, params.lodgingId]);

  const openDeleteModal = (id) => {
    setCurrentItemId(id);
    toggleModal();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  //delete plan data
  const deleteData = async (id) => {
    const docRef = doc(db, "trip", params.slug, "plan", id);
    deleteDoc(docRef).then(() => {
      setPlan((prevItems) => prevItems.filter((item) => id !== item.id));
    });
  };

  if (isLoading) {
    return <LoadingEffect />;
  }

  return (
    <Main>
      <Nav>
        <Link href={`/trips/${params.slug}`}>
          <Image
            src="/iconmonstr-arrow-left-lined-24.png"
            width={24}
            height={24}
            alt="arrow"
          ></Image>
          <NavSpan>Back to Trip Summary</NavSpan>
        </Link>
      </Nav>
      {plan.map((item) => (
        <LodgingInfo key={item.id} item={item} onDelete={openDeleteModal} />
      ))}
      {modal && (
        <DeleteModal
          toggleModal={toggleModal}
          deleteData={() => deleteData(currentItemId)}
          id={currentItemId}
          caption="plan"
        />
      )}
    </Main>
  );
}

const Main = styled.div`
  width: 1200px;
  margin: 50px auto;
  @media (min-width: 360px) and (max-width: 1200px) {
    width: 90%;
  }
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 360px) and (max-width: 1200px) {
    width: 90%;
    margin: auto;
  }
`;

const NavSpan = styled.span`
  margin-left: 5px;
  font-size: 24px;
  font-weight: 600;
  color: #6a9066;
  &:hover {
    color: #70946c;
  }
`;

const PlanContainer = styled.div`
  padding: 40px 30px;
  background-color: #fff;
  color: #6d5b48;
  margin-top: 50px;
  border-radius: 10px;
  position: relative;
`;

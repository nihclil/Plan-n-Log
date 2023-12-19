"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { db } from "lib/firebase";
import { collection, doc, getDoc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import DeleteModal from "components/Common/Modals/DeleteModal";
import LoadingEffect from "components/Common/Loading/LoadingEffect";
import useAuthRedirect from "hooks/useAuthRedirect";
import ContactInfo from "components/Common/DataDisplay/ContactInfo";
import DeleteButton from "components/Common/Buttons/DeleteButton";
import formatDate from "utils/formatDate";
import calculateDuration from "utils/calculateDuration";
import ActivityInfo from "components/Common/DataDisplay/ActivityInfo";

export default function Home({ params }) {
  const [plan, setPlan] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useAuthRedirect();

  useEffect(() => {
    const docRef = doc(db, "trip", params.slug, "plan", params.planId);
    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        setPlan([{ ...docSnapshot.data(), id: docSnapshot.id }]);
      }
      setIsLoading(false);
    });
  }, [params.slug, params.planId]);

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
        <ActivityInfo key={item.id} item={item} onDelete={openDeleteModal} />
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
    width: auto;
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

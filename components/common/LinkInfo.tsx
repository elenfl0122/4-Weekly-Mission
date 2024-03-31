import styled from 'styled-components';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { useState, MouseEvent } from 'react';
import kebab from '@/public/assets/kebab.svg';
import Popover from '@/components/pages/folderPage/Popover';
import { modalTypes } from '@/util/constants';

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 2rem;
  transition: all 0.3s ease-in-out;
`;

const TimeInfoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ElapsedTime = styled.p`
  line-height: 1.7rem;
  font-size: 1.3rem;
  font-weight: 400;
  color: #666;
`;

const ButtonGroup = styled.div`
  position: relative;
`;

const ButtonKebab = styled.button`
  width: 2.1rem;
  height: 1.7rem;
  background: url(${kebab}) no-repeat center/cover;
`;

const Desc = styled.p`
  display: -webkit-box;
  height: 4.9rem;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Date = styled.p`
  line-height: 1.9rem;
  font-size: 14px;
  font-weight: 400;
  color: #333;
`;

interface LinkInfo {
  url: string;
  createdAt: string;
  desc: string;
}

const LinkInfo = ({ url, createdAt, desc }: LinkInfo) => {
  const elapsedTime = formatDistanceToNowStrict(createdAt);
  const date = format(createdAt, 'yyyy. M. d');
  const [showPopover, setShowPopover] = useState(false);

  const handleKebabClick = (e: MouseEvent) => {
    e.preventDefault();
    setShowPopover(true);
  };

  const handlePopoverClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    // e.target이 ButtonElement의 인스턴스가 아니라면 얼리 return
    // if (!(e.target instanceof HTMLButtonElement)) return;
    if (
      !(
        e.currentTarget.dataset.modal === modalTypes.deleteLink ||
        e.currentTarget.dataset.modal === modalTypes.add
      )
    )
      return;
    setShowPopover(false);
  };

  return (
    <>
      <InfoGroup>
        <TimeInfoGroup>
          <ElapsedTime>{elapsedTime} ago</ElapsedTime>
          <ButtonGroup>
            <ButtonKebab onClick={handleKebabClick} />
            <Popover
              url={url}
              show={showPopover}
              onPopoverClick={handlePopoverClick}
            />
          </ButtonGroup>
        </TimeInfoGroup>
        <Desc>{desc}</Desc>
        <Date>{date}</Date>
      </InfoGroup>
    </>
  );
};

export default LinkInfo;
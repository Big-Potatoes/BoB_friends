import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Wrapper,
  ContentWrapper,
  Title,
  Author,
  TagContainer,
  Tag,
  PeopleCountWrapper,
  ChartWrapper,
  CountNum,
} from '../styles/s-components/listcontent'
import PeopleCountPie from './PeopleCountPie'
const ListContent = ({ content }) => {
  const navigate = useNavigate()
  const {
    id,
    locationDescription,
    peopleCount,
    totalPeopleCount,
    title,
    tags,
    writer,
  } = content
  const data = [
    {
      id: 'peopleCount',
      value: peopleCount,
      color: `var(--maincolor)`,
    },
    {
      id: 'leftPeopleCount',
      value: totalPeopleCount - peopleCount,
      color: `var(--black-100)`,
    },
  ]
  const onClickItem = (e, id) => {
    // 이 게시글의 고유 아이디 받아서 detail?id= 로 보내야함
    console.log(e, id)
    navigate(`/detail?id=${id}`)
  }
  return (
    <Wrapper className={`content${id}`} onClick={(e) => onClickItem(e, id)}>
      <ContentWrapper className="wrapper">
        <div className="content_wrapper">
          <Title>{title}</Title>
          <div className="content_container">
            <Author>{writer}</Author>
            <span>{locationDescription}</span>
          </div>
        </div>
        <TagContainer className="tags_container">
          {tags.map((el, idx) => {
            return <Tag key={idx}>{el}</Tag>
          })}
        </TagContainer>
      </ContentWrapper>
      <PeopleCountWrapper className="people_count">
        <ChartWrapper className="chart_wrapper">
          <PeopleCountPie clasName="chart" data={data} />
          <CountNum className="chart_summary">{`${peopleCount}/${totalPeopleCount}`}</CountNum>
        </ChartWrapper>
      </PeopleCountWrapper>
    </Wrapper>
  )
}

export default ListContent

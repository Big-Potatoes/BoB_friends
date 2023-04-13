/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react'
import { api } from '../api/api'
import { OuterWrapper, Tag, ButtonSm } from '../styles/s-global/common'
import { FaQuestionCircle } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import {
  TagWrap,
  ContentHead,
  ContentTitle,
  ContentUser,
  ContentConsole,
  ContentFieldBox,
  ContentSubject,
  ContentBtnWrap,
  ContentText,
  ContentArea,
  ContentAreaBox,
  Tooltip,
  TooltipMsg,
  FriendsMenu,
  MenuStatus,
  PickupImages,
} from '../styles/s-pages/content'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import { useParams } from 'react-router-dom'
import PeopleCountPie from '../components/PeopleCountPie'
import MapContainer from '../components/MapContainer'
dayjs.extend(relativeTime)
dayjs.locale('ko')

const Content = () => {
  const { id } = useParams()
  const [contentData, setContentData] = useState([])
  const [recruitEnd, setRecruitEnd] = useState(false)
  const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const [swiper, setSwiper] = useState(null)
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const swiperParams = {
    onBeforeInit: (swiper) => {
      swiper.activeIndex = mainImageIndex
    },
    loop: true,
    onSwiper: setSwiper,
    onSlideChange: (e) => setMainImageIndex(e.activeIndex),
  }

  useEffect(() => {
    api.get(`/recruit-content/${id}`).then((res) => {
      setContentData(res.data)
      if (currentTime >= res.data.endDateTime) setRecruitEnd(true)
    })
  }, [])
  const unitCalc = (amount) => {
    amount = Math.floor(amount)
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const cutSeconds = (time) => {
    return time.slice(0, -3)
  }
  const chartData = [
    {
      id: 'peopleCount',
      value: contentData.peopleCount,
      color: `var(--maincolor)`,
    },
    {
      id: 'leftPeopleCount',
      value: contentData.totalPeopleCount - contentData.peopleCount,
      color: `var(--black-100)`,
    },
  ]

  console.log(contentData)

  return (
    <OuterWrapper>
      <TagWrap>
        {contentData.tags &&
          contentData.tags.map((item, idx) => <Tag key={idx}>{item}</Tag>)}
      </TagWrap>
      <ContentHead>
        <ContentTitle>{contentData.title}</ContentTitle>
        <PeopleCountPie
          data={chartData}
          peopleCount={contentData.peopleCount}
          totalPeopleCount={contentData.totalPeopleCount}
        />
      </ContentHead>
      <ContentUser>
        <h3>{contentData.writer}</h3>
        <div>
          <p>
            {contentData.createDateTime &&
              cutSeconds(contentData.createDateTime)}
          </p>
          <span>{dayjs(contentData.createDateTime).fromNow()}</span>
        </div>
      </ContentUser>
      <ContentConsole>
        <div>
          <ContentFieldBox>
            <ContentSubject>모집 종료 시간</ContentSubject>
            <p>
              <span>
                {contentData.endDateTime && cutSeconds(contentData.endDateTime)}
              </span>
              <span className="notice">
                {recruitEnd
                  ? '모집완료'
                  : dayjs(contentData.endDateTime).toNow()}
              </span>
            </p>
          </ContentFieldBox>
          <ContentFieldBox>
            <ContentSubject>배달비 개인 부담금</ContentSubject>
            <p>
              {contentData.deliveryPrice &&
                `${unitCalc(contentData.deliveryPrice.totalPrice)}원/${
                  contentData.totalPeopleCount
                }명 = ${unitCalc(
                  contentData.deliveryPrice.totalPrice /
                    contentData.totalPeopleCount
                )}원`}
            </p>
          </ContentFieldBox>
        </div>
        <ContentBtnWrap>
          <ButtonSm paddingRight="10px">
            참여하기
            <img src="/assets/spoon.png" alt="참여하기" />
          </ButtonSm>
          <ButtonSm>
            내 친구 <br />
            초대하기
            <img src="/assets/spoons.png" alt="친구초대하기" />
          </ButtonSm>
        </ContentBtnWrap>
      </ContentConsole>
      <ContentText>{contentData.content}</ContentText>
      <ContentArea>
        <ContentAreaBox>
          <ContentSubject>지점 정보</ContentSubject>
          <MapContainer
            mapid={`map_store_${contentData.id}`}
            mapLocation={
              contentData.storeLocation && contentData.storeLocation.address
            }
            lat={
              contentData.storeLocation && contentData.storeLocation.latitude
            }
            lng={
              contentData.storeLocation && contentData.storeLocation.longitude
            }
          />
        </ContentAreaBox>
        <ContentAreaBox>
          <ContentSubject>
            밥 친구가 주문한 메뉴
            <Tooltip>
              <FaQuestionCircle />
              <TooltipMsg>
                메뉴가 고민되나요?
                <br />
                밥친구들의 주문을 확인해 보세요!
              </TooltipMsg>
            </Tooltip>
          </ContentSubject>
          <FriendsMenu>
            {contentData.menus &&
              contentData.menus.map((item, idx) => <li key={idx}>{item}</li>)}
          </FriendsMenu>
          <MenuStatus>주문 현황</MenuStatus>
        </ContentAreaBox>
        <ContentAreaBox>
          <ContentSubject>픽업 장소</ContentSubject>
          <MapContainer
            mapid={`map_pickup_${contentData.id}`}
            mapLocation={
              contentData.pickupLocation && contentData.pickupLocation.address
            }
            lat={
              contentData.pickupLocation && contentData.pickupLocation.latitude
            }
            lng={
              contentData.pickupLocation && contentData.pickupLocation.longitude
            }
          />
        </ContentAreaBox>
        <ContentAreaBox>
          <ContentSubject>픽업 장소 사진</ContentSubject>
          <PickupImages>
            <Swiper {...swiperParams} ref={setSwiper}>
              {contentData.pickupLocation &&
                contentData.pickupLocation.images.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <img src={item} alt="픽업장소사진" className="slide-img" />
                  </SwiperSlide>
                ))}
            </Swiper>
          </PickupImages>
        </ContentAreaBox>
      </ContentArea>
    </OuterWrapper>
  )
}

export default Content
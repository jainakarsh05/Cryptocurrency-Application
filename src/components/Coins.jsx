import React, { useEffect } from 'react';
import { server } from '../index';
import axios from 'axios';
import { useState } from 'react';
import {
    Button,
  Container,
  HStack,
  Radio,
  RadioGroup
} from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');
  const currencySymbol = currency==="inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage =(page)=>{
    setPage(page);
    setLoading(true);
}

const btns = new Array(132).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page]);
  if (error) return <ErrorComponent message={'Error while fetching Coins'} />;

  return (
    <Container maxW={"container.xl"}  >
      {loading ? (
        <Loader />
      ) : (
        <>
        <RadioGroup value={currency} p={"4"} onChange={setCurrency} borderBottom={"2px grey double"} >
            <HStack spacing={"5"} > 
                <Radio value='inr' size={"lg"}><b>INR</b></Radio>
                <Radio value='usd' size={"lg"}><b>USD</b></Radio>
                <Radio value='eur' size={"lg"}><b>EUR</b></Radio>
            </HStack>
        </RadioGroup>

        <HStack wrap={'wrap'} mt={"1px"} borderTop={"double 2px grey"} justifyContent={"space-evenly"}>
            {coins.map(i => (
              <CoinCard
                id={i.id}
                price={i.current_price}
                key={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button 
                key={item}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
                css={{
                    ":hover":{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        color:'black',
                        fontWeight : 800
                    }
                }}
                >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;

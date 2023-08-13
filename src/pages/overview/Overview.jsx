import React from "react";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import CountUp from "react-countup";
import { FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { BsFillCartCheckFill, BsShop } from "react-icons/bs";

const Overview = () => {
  // =================> TOTAL CUSTOMER
  const { data: totalCustomer = [] } = useQuery({
    queryKey: ["totalCustomer"],
    queryFn: async () => {
      const res = await fetch(
        "https://site-server-nahid-dev.vercel.app/totalCustomer"
      );
      const data = await res.json();
      return data;
    },
  });

  // =================> TOTAL PRODUCT
  const { data: totalProduct = [] } = useQuery({
    queryKey: ["totalProduct"],
    queryFn: async () => {
      const res = await fetch(
        "https://site-server-nahid-dev.vercel.app/totalProduct"
      );
      const data = await res.json();
      return data;
    },
  });

  // =================> TOTAL ORDER
  const { data: totalOrder = [] } = useQuery({
    queryKey: ["totalOrder"],
    queryFn: async () => {
      const res = await fetch(
        "https://site-server-nahid-dev.vercel.app/totalOrder"
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div>
      <SectionHeader title={"Overview"}></SectionHeader>
      {/* COUNTER UP SECTION */}
      <div className="flex justify-center pt-5 md:pt-10">
        <div className="stats shadow-md stats-vertical md:stats-horizontal">
          <div className="stat">
            <div className="stat-figure color-one">
              <FaUsers size={32}></FaUsers>
            </div>
            <div className="stat-title">Total Customers</div>
            <div className="stat-value flex gap-2">
              <CountUp
                start={0}
                end={totalCustomer?.length}
                delay={0}
                duration={8}
              >
                {({ countUpRef }) => (
                  <div>
                    <span ref={countUpRef} />
                  </div>
                )}
              </CountUp>
              <span className="text-2xl">person</span>
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure color-one">
              <BsFillCartCheckFill size={32}></BsFillCartCheckFill>
            </div>
            <div className="stat-title">Total Order</div>
            <div className="stat-value">
              <CountUp
                start={0}
                end={totalOrder?.length}
                delay={0}
                duration={8}
              >
                {({ countUpRef }) => (
                  <div>
                    <span ref={countUpRef} />
                  </div>
                )}
              </CountUp>
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure color-one">
              <BsShop size={32}></BsShop>
            </div>
            <div className="stat-title">Total Product</div>
            <div className="stat-value">
              <CountUp
                start={0}
                end={totalProduct?.length}
                delay={0}
                duration={8}
              >
                {({ countUpRef }) => (
                  <div>
                    <span ref={countUpRef} />
                  </div>
                )}
              </CountUp>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

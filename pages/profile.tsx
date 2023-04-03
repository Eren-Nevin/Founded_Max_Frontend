import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import Box from "@/components/Box";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import { Adjust, TrendingDown, CalendarToday } from "@mui/icons-material";
import {
  Grid,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default function Boxes() {
  const router = useRouter();
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  const [minimumTradingDays, setMinimumTradingDays] = useState({
    Minimum: "",
    CurrentResult: "",
    Reached: false,
  });
  const [profitTarget, setProfitTarget] = useState({
    MinimumProfit: "",
    CurrentResult: "",
    Reached: false,
  });
  const [dailyLoss, setDailyLoss] = useState({
    MaxDailyLoss: "",
    CurrentResult: "",
    Reached: false,
  });
  const [initialDepositLoss, setInitialDepositLoss] = useState({
    MaxLoss: "",
    CurrentResult: "",
    Reached: false,
  });

  const getData = async () => {
    let token = localStorage.getItem("access-token");
    await axios
      .get(
        `https://dwb.software:3001/api/get_goals?login=${getLoginFromURL()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        let goalsApi = res.data.goals;
        // console.log("res\n", res);
        setMinimumTradingDays({
          Minimum: goalsApi["Minimum Trading Days"].Minimum,
          CurrentResult: goalsApi["Minimum Trading Days"]["Current Result"],
          Reached: goalsApi["Minimum Trading Days"]["Reached"],
        });
        setProfitTarget({
          MinimumProfit: goalsApi["Profit Target"]["Minimum Profit"],
          CurrentResult: goalsApi["Profit Target"]["Current Result"],
          Reached: goalsApi["Profit Target"]["Reached"],
        });
        setDailyLoss({
          MaxDailyLoss: goalsApi["Daily Loss"]["Max Loss"],
          CurrentResult: goalsApi["Daily Loss"]["Current Result"],
          Reached: goalsApi["Daily Loss"]["Reached"],
        });
        setInitialDepositLoss({
          MaxLoss: goalsApi["Initial Deposit Loss"]["Max Loss"],
          CurrentResult: goalsApi["Initial Deposit Loss"]["Current Result"],
          Reached: goalsApi["Initial Deposit Loss"]["Reached"],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let login = getLoginFromURL();
    if (login != null) {
      localStorage.getItem("access-token");
    }
    let delay = setInterval(async () => {
      await getData();
    }, 30000);
    async function fetchData() {
      await getData();
    }
    fetchData();
    return () => clearInterval(delay);
  }, []);

    useEffect(() => {
        let login = getLoginFromURL()
        if (login != null) {
            console.log(login);
            // setUser({ uid: login });
        }
        let delay = setInterval(async () => {
            await getData();
        }, 30000);
        async function fetchData() {
            await getData();
        }
        fetchData();
        return () => clearInterval(delay);
    }, []);

  const getLoginFromURL = () => {
    let params = new URL(window.location.toString()).searchParams;
    let login = params.get("login");
    return login;
  };

  return (
    <>
      <Head>
        <title>Funded Max</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Grid display="flex" alignItems="center" justifyContent="center">
        <Grid container item direction="column" xs={11} sx={{ py: 1 }}>
          <Typography variant="h5" sx={{ color: "gray", ml: 2 }}>
            Goals Overview
          </Typography>
          <Grid container direction={tablet ? "column" : "row"}>
            <Grid item xs={6} sx={{ px: 1 }}>
              <Box
                icon={<CalendarToday />}
                title={"Minimum trading days"}
                expectation={["Minimum:", minimumTradingDays.Minimum + " Day"]}
                Result={[
                  "Current result:",
                  minimumTradingDays.CurrentResult + " Day",
                ]}
                Percent={
                  (+minimumTradingDays.CurrentResult /
                    +minimumTradingDays.Minimum) *
                  100
                }
                Passed={minimumTradingDays.Reached ? "Passed" : "In Progress"}
                ReachedColor={
                  minimumTradingDays.Reached ? "#00a8e8" : "#ff206e"
                }
                ReachedBgcolor={
                  minimumTradingDays.Reached
                    ? "rgb(0 168 232 / 8%)"
                    : "rgb(220 53 69 / 8%)"
                }
                chartColor={minimumTradingDays.Reached ? "#00a8e8" : "#ff206e"}
              />
            </Grid>
            <Grid item xs={6} sx={{ px: 1 }}>
              <Box
                icon={<Adjust />}
                title={"Profit Target"}
                expectation={["Minimum: ", profitTarget.MinimumProfit]}
                Result={["Current result: ", profitTarget.CurrentResult]}
                Percent={Math.max(
                  (+profitTarget.CurrentResult / +profitTarget.MinimumProfit) *
                    100,
                  0
                )}
                Passed={profitTarget.Reached ? "Passed" : "In Progress"}
                ReachedColor={profitTarget.Reached ? "#00a8e8" : "#ff206e"}
                ReachedBgcolor={
                  profitTarget.Reached
                    ? "rgb(0 168 232 / 8%)"
                    : "rgb(220 53 69 / 8%)"
                }
                chartColor={profitTarget.Reached ? "#ff206e" : "#00a8e8"}
              />
            </Grid>
            <Grid item xs={6} sx={{ px: 1 }}>
              <Box
                icon={<TrendingDown />}
                title={"Daily Loss"}
                expectation={["Max. loss: ", dailyLoss.MaxDailyLoss]}
                Result={["Max. loss recorded: ", dailyLoss.CurrentResult]}
                Percent={Math.max(
                  (+dailyLoss.CurrentResult / +dailyLoss.MaxDailyLoss) * 100,
                  0
                )}
                Passed={dailyLoss.Reached ? "Failed" : "Clear"}
                ReachedColor={!dailyLoss.Reached ? "#00a8e8" : "#ff206e"}
                ReachedBgcolor={
                  !dailyLoss.Reached
                    ? "rgb(0 168 232 / 8%)"
                    : "rgb(220 53 69 / 8%)"
                }
                chartColor={!dailyLoss.Reached ? "#00a8e8" : "#ff206e"}
              />
            </Grid>
            <Grid item xs={6} sx={{ px: 1 }}>
              <Box
                icon={<TrendingDown />}
                title={"Initial Deposit Loss"}
                expectation={["Max. loss: ", initialDepositLoss.MaxLoss]}
                Result={[
                  "Max. loss recorded: ",
                  initialDepositLoss.CurrentResult,
                ]}
                Percent={Math.max(
                  (+initialDepositLoss.CurrentResult /
                    +initialDepositLoss.MaxLoss) *
                    100,
                  0
                )}
                Passed={initialDepositLoss.Reached ? "Failed" : "Clear"}
                ReachedColor={
                  !initialDepositLoss.Reached ? "#00a8e8" : "#ff206e"
                }
                ReachedBgcolor={
                  !initialDepositLoss.Reached
                    ? "rgb(0 168 232 / 8%)"
                    : "rgb(220 53 69 / 8%)"
                }
                chartColor={!initialDepositLoss.Reached ? "#00a8e8" : "#ff206e"}
              />
            </Grid>
          </Grid>
          <Button
            onClick={() => {
              localStorage.removeItem("access-token");
              router.push("/");
            }}
            sx={{ my: 1, ml: 2, width: "20%" }}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

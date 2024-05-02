import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import GameLayout from "@/Layouts/GameLayout";
import { Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { formatTime, parseTime } from "@/utils/common/time";
import announcer from "@/assets/images/game/announcer3-2.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeButton from "@/Components/HomeButton/HomeButton";
import goldMedal from "@/assets/images/game/goldMedal.png";
import silverMedal from "@/assets/images/game/silverMedal.png";
import bronzeMedal from "@/assets/images/game/bronzeMedal.png";
import { useEffect } from "react";
import { useState } from "react";

export default function Ranking({
    gameName,
    gameAcronym,
    maximumPoints,
    finishedGames,
}) {
    // const [finishedGamesState, setFinishedGamesState] = useState(finishedGames);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         axios
    //             .get(route("get-finished-games", { gameAcronym: gameAcronym }))
    //             .then((res) => {
    //                 if (res.data.error) throw new Error(res.data.message);
    //                 setFinishedGamesState(res.data.finishedGames);
    //             })
    //             .catch((e) => console.log(e));
    //     }, 3000);

    //     return () => clearInterval(interval);
    // }, []);

    const sortedFinishedData = useMemo(
        () =>
            finishedGames
                .sort((a, b) => {
                    if (
                        b.correctResponses.length !== a.correctResponses.length
                    ) {
                        return (
                            b.correctResponses.length -
                            a.correctResponses.length
                        );
                    } else {
                        const aInSeconds = a.inMinutes.reduce(
                            (prev, curr) => parseTime(prev) + parseTime(curr),
                            0
                        );
                        const bInSeconds = b.inMinutes.reduce(
                            (prev, curr) => parseTime(prev) + parseTime(curr),
                            0
                        );

                        return aInSeconds - bInSeconds;
                    }
                })
                .map((finishedGame, index) => ({
                    position: index + 1,
                    playerName: finishedGame.playerName,
                    correctResponses: finishedGame.correctResponses.length,
                    points: finishedGame.points,
                    time: formatTime(
                        finishedGame.inMinutes.reduce(
                            (prev, curr) => parseTime(prev) + parseTime(curr),
                            0
                        )
                    ),
                })),
        [finishedGames]
    );

    const [columns, setColumns] = useState([
        {
            label: "",
            dataKey: "position",
        },
        {
            label: "Jogador",
            dataKey: "playerName",
        },
        {
            label: "Acertos",
            dataKey: "correctResponses",
        },
        {
            label: "Pontos",
            dataKey: "points",
        },
        {
            label: "Tempo",
            dataKey: "time",
        },
    ]);
    const hideImages = useMediaQuery("(max-width:800px)");
    const isMobile = useMediaQuery("(max-width:428px)");

    useEffect(() => {
        if (isMobile) {
            setColumns([
                {
                    label: "",
                    dataKey: "position",
                },
                {
                    label: "Jogador",
                    dataKey: "playerName",
                },
            ]);
            return;
        }

        setColumns([
            {
                label: "",
                dataKey: "position",
            },
            {
                label: "Jogador",
                dataKey: "playerName",
            },
            {
                label: "Acertos",
                dataKey: "correctResponses",
            },
            {
                label: "Pontos",
                dataKey: "points",
            },
            {
                label: "Tempo",
                dataKey: "time",
            },
        ]);
    }, [isMobile]);

    return (
        <GameLayout title={`Ranking do Jogo`}>
            <HomeButton />
            <Grid
                container
                spacing={3}
                className={`min-h-full justify-evenly ${
                    hideImages ? (isMobile ? "px-3" : "px-10") : "px-20"
                }`}
            >
                {!hideImages && (
                    <Grid item xs={2} className="content-center">
                        <img
                            src={announcer}
                            alt="announcer"
                            style={{ width: "110%", height: "110%" }}
                            className="fill-current object-cover"
                        />
                    </Grid>
                )}
                <Grid
                    item
                    xs={hideImages ? 12 : 8}
                    className="content-center text-center"
                >
                    <Paper
                        elevation={3}
                        style={{
                            height: "80vh",
                            width: "100%",
                            borderRadius: "12px",
                            overflow: "auto",
                        }}
                    >
                        <TableVirtuoso
                            data={sortedFinishedData}
                            components={{
                                Scroller: React.forwardRef((props, ref) => (
                                    <TableContainer
                                        component={Paper}
                                        {...props}
                                        ref={ref}
                                    />
                                )),
                                Table: (props) => (
                                    <Table
                                        {...props}
                                        sx={{
                                            borderCollapse: "separate",
                                            tableLayout: "fixed",
                                        }}
                                    />
                                ),
                                TableHead: React.forwardRef((props, ref) => (
                                    <TableHead
                                        {...props}
                                        ref={ref}
                                        className="bg-black"
                                    />
                                )),
                                TableRow: ({ item: _item, ...props }) => (
                                    <TableRow {...props} />
                                ),
                                TableBody: React.forwardRef((props, ref) => (
                                    <TableBody {...props} ref={ref} />
                                )),
                            }}
                            fixedHeaderContent={() => (
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.dataKey}
                                            variant="head"
                                            align="center"
                                            sx={{
                                                width:
                                                    column.dataKey ===
                                                    "position"
                                                        ? "60px"
                                                        : "auto",
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                className="text-white"
                                            >
                                                {column.label}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )}
                            itemContent={(_index, row) => (
                                <React.Fragment>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.dataKey}
                                            align={
                                                column.dataKey === "playerName"
                                                    ? "left"
                                                    : "center"
                                            }
                                        >
                                            {column.dataKey === "position" &&
                                            row.position <= 3 ? (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            row.position === 1
                                                                ? goldMedal
                                                                : row.position ===
                                                                  2
                                                                ? silverMedal
                                                                : bronzeMedal
                                                        }
                                                        alt="medal"
                                                        style={{
                                                            objectFit: "cover",
                                                            alignSelf: "center",
                                                            minWidth: "25px",
                                                            minHeight: "25px",
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <Typography
                                                    variant="subtitle1"
                                                    className="whitespace-nowrap overflow-hidden w-full text-ellipsis"
                                                >
                                                    {row[column.dataKey]}
                                                </Typography>
                                            )}
                                        </TableCell>
                                    ))}
                                </React.Fragment>
                            )}
                        />
                    </Paper>
                </Grid>
                {!hideImages && (
                    <Grid item xs={2} className="content-center">
                        <img
                            src={announcer}
                            alt="announcer"
                            style={{
                                width: "110%",
                                height: "110%",
                                transform: "scaleX(-1)",
                            }}
                            className="fill-current object-cover"
                        />
                    </Grid>
                )}
            </Grid>
        </GameLayout>
    );
}

import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    Rectangle,
    Sector,
} from "recharts";
import { curveCardinal } from "d3-shape";

const data = [
    { name: "Group A", value: 300 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const data01 = [
    { name: "Fornecedor 1", value: 909 },
    { name: "Fornecedor 2", value: 300 },
    { name: "Fornecedor 3", value: 300 },
    { name: "Fornecedor 4", value: 200 },
    { name: "Fornecedor 5", value: 278 },
    { name: "Fornecedor 6", value: 100 },
];

const radar = [
    {
        subject: "Vendas",
        A: 140,
        B: 100,
        fullMark: 150,
    },
    {
        subject: "Reclamações",
        A: 30,
        B: 52,
        fullMark: 150,
    },
    {
        subject: "Lucro",
        A: 145,
        B: 97,
        fullMark: 150,
    },
    {
        subject: "Despesas",
        A: 94,
        B: 134,
        fullMark: 150,
    },
    {
        subject: "Prazos",
        A: 91,
        B: 90,
        fullMark: 150,
    },
    {
        subject: "Entregas",
        A: 65,
        B: 89,
        fullMark: 150,
    },
];

const line = [
    { name: "Regina", Vendas: 4000, Lucro: 2400, Gastos: 2400 },
    { name: "João", Vendas: 6000, Lucro: 3600, Gastos: 2400 },
    { name: "Maria", Vendas: 3500, Lucro: 2100, Gastos: 1400 },
    { name: "Pedro", Vendas: 8000, Lucro: 4800, Gastos: 3200 },
    { name: "Ana", Vendas: 4500, Lucro: 2700, Gastos: 1800 },
    { name: "Lucas", Vendas: 5200, Lucro: 3120, Gastos: 2080 },
    { name: "Mariana", Vendas: 3700, Lucro: 2220, Gastos: 1480 },
    { name: "Carlos", Vendas: 4800, Lucro: 2880, Gastos: 1920 },
    { name: "Juliana", Vendas: 3000, Lucro: 1800, Gastos: 1200 },
    { name: "Felipe", Vendas: 7000, Lucro: 4200, Gastos: 2800 },
    { name: "Sandra", Vendas: 5500, Lucro: 3300, Gastos: 2200 },
    { name: "Rafael", Vendas: 4200, Lucro: 2520, Gastos: 1680 },
    { name: "Patrícia", Vendas: 4800, Lucro: 2880, Gastos: 1920 },
    { name: "Anderson", Vendas: 6500, Lucro: 3900, Gastos: 2600 },
    { name: "Camila", Vendas: 3800, Lucro: 2280, Gastos: 1520 },
    { name: "Fernando", Vendas: 5000, Lucro: 3000, Gastos: 2000 },
    { name: "Isabela", Vendas: 4400, Lucro: 2640, Gastos: 1760 },
    { name: "Ricardo", Vendas: 4600, Lucro: 2760, Gastos: 1840 },
    { name: "Vanessa", Vendas: 5300, Lucro: 3180, Gastos: 2120 },
    { name: "Luis", Vendas: 3200, Lucro: 1920, Gastos: 1280 },
];

const filiais = [
    { name: "Regina", Vendas: 4000, Lucro: 2400, Gastos: 2400 },
    { name: "João", Vendas: 6000, Lucro: 3600, Gastos: 2400 },
    { name: "Maria", Vendas: 3500, Lucro: 2100, Gastos: 1400 },
    { name: "Pedro", Vendas: 8000, Lucro: 4800, Gastos: 3200 },
    { name: "Ana", Vendas: 4500, Lucro: 2700, Gastos: 1800 },
    { name: "Lucas", Vendas: 5200, Lucro: 3120, Gastos: 2080 },
    { name: "Mariana", Vendas: 3700, Lucro: 2220, Gastos: 1480 },
    { name: "Carlos", Vendas: 4800, Lucro: 2880, Gastos: 1920 },
    { name: "Juliana", Vendas: 3000, Lucro: 1800, Gastos: 1200 },
    { name: "Felipe", Vendas: 7000, Lucro: 4200, Gastos: 2800 },
    { name: "Sandra", Vendas: 5500, Lucro: 3300, Gastos: 2200 },
    { name: "Rafael", Vendas: 4200, Lucro: 2520, Gastos: 1680 },
    { name: "Patrícia", Vendas: 4800, Lucro: 2880, Gastos: 1920 },
    { name: "Anderson", Vendas: 6500, Lucro: 3900, Gastos: 2600 },
    { name: "Camila", Vendas: 3800, Lucro: 2280, Gastos: 1520 },
    { name: "Fernando", Vendas: 5000, Lucro: 3000, Gastos: 2000 },
    { name: "Isabela", Vendas: 4400, Lucro: 2640, Gastos: 1760 },
    { name: "Ricardo", Vendas: 4600, Lucro: 2760, Gastos: 1840 },
    { name: "Vanessa", Vendas: 5300, Lucro: 3180, Gastos: 2120 },
    { name: "Luis", Vendas: 3200, Lucro: 1920, Gastos: 1280 },
];

const curve = [
    {
        name: "22/1",
        Real: 4000,
        Dolar: 2400,
    },
    {
        name: "23/1",
        Real: 3000,
        Dolar: 1398,
    },
    {
        name: "24/1",
        Real: 2000,
        Dolar: 9800,
    },
    {
        name: "25/1",
        Real: 2780,
        Dolar: 3908,
    },
    {
        name: "26/1",
        Real: 1890,
        Dolar: 4800,
    },
    {
        name: "27/1",
        Real: 2390,
        Dolar: 3800,
    },
    {
        name: "28/1",
        Real: 3490,
        Dolar: 4300,
    },
];

const cardinal = curveCardinal.tension(0.2);

const barChart = [
    { name: "1", uv: 300, pv: 456 },
    { name: "2", uv: -145, pv: 230 },
    { name: "3", uv: -100, pv: 345 },
    { name: "4", uv: -8, pv: 450 },
    { name: "5", uv: 100, pv: 321 },
    { name: "6", uv: 9, pv: 235 },
    { name: "7", uv: 53, pv: 267 },
    { name: "8", uv: 252, pv: -378 },
    { name: "9", uv: 79, pv: -210 },
    { name: "10", uv: 294, pv: -23 },
    { name: "12", uv: 43, pv: 45 },
    { name: "13", uv: -74, pv: 90 },
    { name: "14", uv: -71, pv: 130 },
    { name: "15", uv: -117, pv: 11 },
    { name: "16", uv: -186, pv: 107 },
    { name: "17", uv: -16, pv: 926 },
    { name: "18", uv: -125, pv: 653 },
    { name: "19", uv: 222, pv: 366 },
    { name: "20", uv: 372, pv: 486 },
    { name: "21", uv: 182, pv: 512 },
    { name: "22", uv: 164, pv: 302 },
    { name: "23", uv: 316, pv: 425 },
    { name: "24", uv: 131, pv: 467 },
    { name: "25", uv: 291, pv: -190 },
    { name: "26", uv: -47, pv: 194 },
    { name: "27", uv: -415, pv: 371 },
    { name: "28", uv: -182, pv: 376 },
    { name: "29", uv: -93, pv: 295 },
    { name: "30", uv: -99, pv: 322 },
    { name: "31", uv: -52, pv: 246 },
    { name: "32", uv: 154, pv: 33 },
    { name: "33", uv: 205, pv: 354 },
    { name: "34", uv: 70, pv: 258 },
    { name: "35", uv: -25, pv: 359 },
    { name: "36", uv: -59, pv: 192 },
    { name: "37", uv: -63, pv: 464 },
    { name: "38", uv: -91, pv: -2 },
    { name: "39", uv: -66, pv: 154 },
    { name: "40", uv: -50, pv: 186 },
];

const simpleBar = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const positiveNegative = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: -3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: -2000,
        pv: -9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: -1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: -3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`PV ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default function Dashboard() {
    const [state, setState] = useState({
        activeIndex: 0,
    });

    const onPieEnter = (_, index) => {
        setState({
            activeIndex: index,
        });
    };

    return (
        <AuthenticatedLayout title="Dashboard"></AuthenticatedLayout>
    );

    return (
        <AuthenticatedLayout title="Dashboard">
            <ResponsiveContainer width={650} height={300}>
                <LineChart
                    width={500}
                    height={300}
                    data={line}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="Lucro"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="Vendas" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="Gastos" stroke="#3485a0" />
                </LineChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={300} height={300}>
                <PieChart width={300} height={300}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={600} height={300}>
                <AreaChart
                    width={500}
                    height={400}
                    data={filiais}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="Vendas"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                    />
                    <Area
                        type="monotone"
                        dataKey="Lucro"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                    />
                    <Area
                        type="monotone"
                        dataKey="Gastos"
                        stackId="1"
                        stroke="#ffc658"
                        fill="#ffc658"
                    />
                </AreaChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={300} height={300}>
                <PieChart width={300} height={300}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data01}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={300} height={300}>
                <AreaChart
                    width={500}
                    height={400}
                    data={curve}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="Real"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.3}
                    />
                    <Area
                        type={cardinal}
                        dataKey="Dolar"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.3}
                    />
                </AreaChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={490} height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radar}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar
                        name="Filial 1"
                        dataKey="A"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                    />
                    <Radar
                        name="Filial 2"
                        dataKey="B"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.6}
                    />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={600} height={430} className="mb-10">
                <BarChart
                    width={500}
                    height={300}
                    data={barChart}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                        verticalAlign="top"
                        wrapperStyle={{ lineHeight: "40px" }}
                    />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={300} height={300}>
                <BarChart
                    width={500}
                    height={300}
                    data={simpleBar}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="pv"
                        fill="#8884d8"
                        activeBar={<Rectangle fill="#add8e6" stroke="blue" />}
                    />
                    <Bar
                        dataKey="uv"
                        fill="#82ca9d"
                        activeBar={<Rectangle fill="#b75fb7" stroke="purple" />}
                    />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={300} height={300}>
                <BarChart
                    width={500}
                    height={300}
                    data={simpleBar}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                    <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={300} height={300}>
                <BarChart
                    width={500}
                    height={300}
                    data={positiveNegative}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width={500} height={400}>
                <PieChart width={500} height={400}>
                    <Pie
                        activeIndex={state.activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                </PieChart>
            </ResponsiveContainer>
        </AuthenticatedLayout>
    );
}

// const { showLoader, hideLoader } = useLoader();

// const simulateLoading = async () => {
//     showLoader(); // Mostra o indicador de carregamento
//     try {
//         // Simula uma chamada assíncrona
//         await new Promise((resolve) => setTimeout(resolve, 5000));
//     } finally {
//         hideLoader(); // Esconde o indicador de carregamento, independentemente do resultado da chamada
//     }
// };
// useEffect(() => {
//     // simulateLoading();
// }, []);

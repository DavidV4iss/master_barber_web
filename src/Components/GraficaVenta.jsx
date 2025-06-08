import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GraficaVenta({ ventas }) {
    if (!Array.isArray(ventas) || ventas.length === 0) {
        return <p className='text-danger text-center mt-5 pt-5 my-5'>No hay datos para mostrar</p>;
    }

    const datosValidos = ventas.every(venta => venta.nombre && typeof venta.cantidad === 'number' && venta.cantidad >= 0);
    if (!datosValidos) {
        return <p className='text-danger text-center mt-5 pt-5 my-5'>Datos inválidos para mostrar la gráfica</p>;
    }

    const agruparVentasPorProducto = (ventas) => {
        return ventas.reduce((acc, venta) => {
            acc[venta.nombre] = (acc[venta.nombre] || 0) + venta.cantidad;
            return acc;
        }, {});
    };

    const productos = agruparVentasPorProducto(ventas);

    const labels = Object.keys(productos);
    const values = Object.values(productos);

    const maxIndex = values.indexOf(Math.max(...values));
    const productoMasVendido = labels[maxIndex];
    const cantidadMasAlta = values[maxIndex];

    const data = {
        labels,
        datasets: [
            {
                label: 'Cantidad Vendida',
                data: values,
                borderColor: 'rgba(255, 205, 86, 1)',
                backgroundColor: 'rgba(255, 255, 0, 0.2)',
                pointBackgroundColor: '#ffc107',
                pointBorderColor: '#fff',
                tension: 0.3,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#fff'
                }
            },
            title: {
                display: true,
                text: 'ANALISIS DE VENTAS',
                color: 'yellow',
                font: {
                    size: 24,
                    weight: 'bold',
                    family: 'antonparabanckend',
                },
                padding: {
                    top: 10,
                    bottom: 30,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#fff'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
            },
            y: {
                ticks: {
                    color: '#fff'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
            },
        },
    };

    return (
        <div className="text-center container mx-5 bg-dark border-dark shadow mt-5">
            <Line data={data} options={options} />
            <p className="mt-4 text-white fw-bold mb-4">
                Producto más vendido: <span className="text-danger">{productoMasVendido}</span> ({cantidadMasAlta} unidades)
            </p>
        </div>
    );
}

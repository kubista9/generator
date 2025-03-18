using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Depsit.Persitence.Migrations
{
    /// <inheritdoc />
    public partial class Validate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "DummyReadings",
                keyColumn: "Id",
                keyValue: 1,
                column: "ReadingTime",
                value: new DateTime(2025, 1, 3, 15, 12, 6, 185, DateTimeKind.Local).AddTicks(7563));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "DummyReadings",
                keyColumn: "Id",
                keyValue: 1,
                column: "ReadingTime",
                value: new DateTime(2025, 1, 3, 15, 11, 20, 289, DateTimeKind.Local).AddTicks(9914));
        }
    }
}

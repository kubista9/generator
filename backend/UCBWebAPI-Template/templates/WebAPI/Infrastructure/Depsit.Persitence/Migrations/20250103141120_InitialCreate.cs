using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Depsit.Persitence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dummies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TemperatureC = table.Column<double>(type: "float", nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dummies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DummyReadings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReadingTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Value = table.Column<double>(type: "float", nullable: false),
                    DummyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DummyReadings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DummyReadings_Dummies_DummyId",
                        column: x => x.DummyId,
                        principalTable: "Dummies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Dummies",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 1, "2025-01-03", "Warm", 25.0 });

            migrationBuilder.InsertData(
                table: "DummyReadings",
                columns: new[] { "Id", "DummyId", "Location", "ReadingTime", "Value" },
                values: new object[] { 1, 1, "Station 1", new DateTime(2025, 1, 3, 15, 11, 20, 289, DateTimeKind.Local).AddTicks(9914), 25.5 });

            migrationBuilder.CreateIndex(
                name: "IX_DummyReadings_DummyId",
                table: "DummyReadings",
                column: "DummyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DummyReadings");

            migrationBuilder.DropTable(
                name: "Dummies");
        }
    }
}

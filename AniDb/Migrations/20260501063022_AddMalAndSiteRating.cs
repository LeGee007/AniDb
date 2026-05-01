using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AniDb.Migrations
{
    /// <inheritdoc />
    public partial class AddMalAndSiteRating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Animes",
                newName: "SiteRating");

            migrationBuilder.AddColumn<decimal>(
                name: "MalRating",
                table: "Animes",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "SiteRatingCount",
                table: "Animes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MalRating",
                table: "Animes");

            migrationBuilder.DropColumn(
                name: "SiteRatingCount",
                table: "Animes");

            migrationBuilder.RenameColumn(
                name: "SiteRating",
                table: "Animes",
                newName: "Rating");
        }
    }
}
